import axios from 'axios'
import * as bootstrap from 'bootstrap'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router'
import useMessage from '../../hooks/useMessage'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteAllCartItemAsync,
  deleteCartItemAsync,
  getCartAsync,
} from '../../slice/cartSlice'
import CartModal from '../../components/CartModal'
import CartForm from '../../components/CartForm'
import CartTable from '../../components/CartTable'
import CartList from '../../components/CartList'

const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

const Cart = () => {
  const [isLoading, setIsLoading] = useState('')
  const [tempId, setTempId] = useState(null)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const modalRef = useRef(null)
  const modalInstance = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const navigate = useNavigate()
  const { showError, showSuccess } = useMessage()
  const dispatch = useDispatch()
  const cartItem = useSelector(state => state.cart.carts)

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getCartAsync()).unwrap()
      }
      catch (error) {
        showError(error.message)
      }
      finally {
        setIsPageLoading(false)
      }
    })()
    window.scrollTo(0, 0)
  }, [dispatch])

  useEffect(() => {
    if (!isPageLoading && modalRef.current) {
      modalInstance.current = new bootstrap.Modal(modalRef.current)
    }
    return () => {
      if (modalInstance.current) {
        modalInstance.current.dispose()
      }
    }
  }, [isPageLoading])

  const openModal = (id = 'all') => {
    setTempId(id)
    modalInstance.current?.show()
  }
  const closeModal = () => {
    modalInstance.current?.hide()
  }

  const handleView = () => {
    navigate(`/product`)
  }

  const updateCartItem = async (id, product_id, qty, action) => {
    const updateQty = {
      data: {
        product_id: product_id,
        qty: qty,
      },
    }
    try {
      setIsLoading(`${id}-${action}`)
      await axios.put(`${API_BASE}/api/${API_PATH}/cart/${id}`, updateQty)
      await dispatch(getCartAsync()).unwrap()
      showSuccess('已成功更新數量')
    }
    catch (error) {
      showError(error.message)
    }
    finally {
      setIsLoading('')
    }
  }

  const deleteCartItem = async (id) => {
    try {
      await dispatch(deleteCartItemAsync(id)).unwrap()
      showSuccess('已刪除產品')
    }
    catch (error) {
      showError(error.message)
    }
  }

  const deleteAllCartItem = async () => {
    try {
      setIsLoading('loading-delete')
      await dispatch(deleteAllCartItemAsync()).unwrap()
      showSuccess('已清空購物車')
    }
    catch (error) {
      showError(error.message)
    }
    finally {
      setIsLoading('')
    }
  }

  const onSubmit = async (data) => {
    const { userName, email, tel, address, message } = data
    try {
      setIsLoading('loading-submit')
      await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data: {
          user: {
            name: userName,
            email,
            tel,
            address,
          },
          message,
        },
      })
      reset()
      await dispatch(getCartAsync()).unwrap()
      showSuccess('訂單已送出')
    }
    catch (error) {
      showError(error.message)
      console.error('訂單送出失敗詳細資訊:', error.response?.data)
    }
    finally {
      setIsLoading('')
    }
  }
  if (isPageLoading) {
    return (
      <div style={{ minHeight: '55vh' }}>
        <div className="container mt-5 fade-in">
          <div className="custom-emptyCart">
            <Loading height={100} width={100} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="container mt-4 fade-in">
        {cartItem.length === 0 ? (
          <div style={{ minHeight: '55vh' }}>
            <div className="custom-emptyCart">
              <h2>目前購物車是空的</h2>
              <button
                type="button"
                className="btn bg-deepPink mt-2"
                onClick={handleView}
              >
                <i className="bi bi-cart-fill"></i>
                {' '}
                去逛逛
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="custom-cart">
              我的購物車
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => { openModal() }}
              >
                {isLoading === 'loading-delete' ? '正在清空購物車...' : '清空購物車'}
              </button>
            </h3>
            <CartTable
              cartItem={cartItem}
              onUpdateCartItem={updateCartItem}
              isLoading={isLoading}
              onOpenModal={openModal}
            />
            <CartList
              cartItem={cartItem}
              onDeleteCartItem={deleteCartItem}
              onUpdateCartItem={updateCartItem}
              isLoading={isLoading}
            />
            <div className="text-end mt-5">
              <h4 className="mb-5">
                總金額 :
                {' '}
                {cartItem.reduce((acc, item) => { return acc + item.product.price * item.qty }, 0)}
                {' '}
                元
              </h4>
            </div>
            <CartModal
              modalRef={modalRef}
              onCloseModal={closeModal}
              tempId={tempId}
              onDeleteAllCartItem={deleteAllCartItem}
              onDeleteCartItem={deleteCartItem}
            />
            <CartForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              isLoading={isLoading}
              cartItem={cartItem}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
