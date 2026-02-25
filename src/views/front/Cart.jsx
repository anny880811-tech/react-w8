import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";
import getProductsError from "../../utils/pushMessage";
import { useDispatch } from "react-redux";
import useMessage from "../../hooks/useMessage";


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Cart = () => {
    const [isLoading, setIsLoading] = useState('');
    const [IsPageLoading, setIsPageLoading] = useState(true);
    const [cartItem, setCartItem] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const {showError,showSuccess}=useMessage();

    const getCart = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
            setCartItem(res.data.data.carts)
        } catch (error) {
            getProductsError(error);
        } finally { setIsPageLoading(false); }
    };


    useEffect(() => {
        getCart();
    }, [])

    const handleView = () => { navigate(`/product`) }

    const updateCartItem = async (id, product_id, qty, action) => {
        const updateQty = {
            'data': {
                'product_id': product_id,
                'qty': qty
            },
        };
        try {
            setIsLoading(`${id}-${action}`);
            const res = await axios.put(`${API_BASE}/api/${API_PATH}/cat/${id}`, updateQty)
            getCart();
            showSuccess('已成功更新數量');
        } catch (error) {
            showError(error.response.data.message);
        } finally {
            setIsLoading('');
        }
    };

    const deleteCartItem = async (id) => {
        try {
            const res = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`)
            getCart();
            showSuccess('已刪除產品');
        } catch (error) {
            showError(error.response.data.message);
        }
    }

    const deleteAllCartItem = async () => {
        try {
            setIsLoading('loading-delete');
            const res = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`)
            getCart();
            showSuccess('已清空購物車');
        } catch (error) {
            showError(error.response.data.message);
        } finally {
            setIsLoading('');
        }
    }

    const onSubmit = async (data) => {
        const { userName, email, tel, address, message } = data;
        try {
            setIsLoading('loading-submit');
            const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
                data: {
                    user: {
                        name: userName,
                        email,
                        tel,
                        address,
                    },
                    message,
                }
            });
            getCart();
            reset();
        } catch (error) {
            getProductsError(error);
        } finally {
            setIsLoading('');
        }
    }
    if (IsPageLoading) {
        return <div className="container mt-3">
            <div className="row">
                <div className="col">
                    <div className="cart-isPageLoading">
                        <h2><Loading height={100} width={100} /></h2>
                    </div>
                </div>
            </div>
        </div>
    }
    return (<>
        <div className="container mt-3 fade-in">
            <div className="row">
                <div className="col">
                    {cartItem.length === 0 ? <div className="custom-emptyCart">
                        <h2>目前購物車是空的</h2>
                        <button type='button' className="btn bg-deepPink mt-2" onClick={handleView}><i className="bi bi-cart-fill"></i> 去逛逛</button>
                    </div> : <div>
                        <h3 className="custom-cart">我的購物車 <button type="button" className="btn btn-danger" onClick={deleteAllCartItem}>{isLoading === 'loading-delete' ? '正在清空購物車...' : '清空購物車'}</button></h3>
                        <table className="custom-cart-table d-none d-md-table">
                            <thead>
                                <tr>
                                    <th scope="col"><h5>商品明細</h5></th>
                                    <th scope="col"><h5 className="text-center">數量</h5></th>
                                    <th scope="col"><h5 className="text-center">合計</h5></th>
                                    <th scope="col"><h5 className="text-center">刪除</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItem.map((product) => {
                                    return (
                                        <tr key={product.product.id}>
                                            <td className="d-flex align-items-center py-3"><img src={product.product.imageUrl} style={{ 'height': '150px', 'width': '150px', 'objectFit': 'cover', 'borderRadius': '8px' }} className="d-flex" alt="商品圖" />
                                                <div className="ms-5">
                                                    <div className="fw-bold"><h3>{product.product.title}</h3></div>
                                                    <div className="small text-muted">{product.product.content}</div>
                                                    <div className="mt-2 text-danger">NT${product.product.price} 元</div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="d-flex justify-content-center">
                                                    <div className="input-group" style={{ width: '120px' }}>
                                                        <button type="button" className="btn btn-outline-brown-sm"
                                                            onClick={() => { updateCartItem(product.id, product.product.id, product.qty - 1, 'reduce') }}
                                                            disabled={product.qty <= 1 || isLoading === `${product.id}-reduce`}>
                                                            {isLoading === `${product.id}-reduce` ? <Loading height={20} width={20} /> : '-'}</button>

                                                        <input type="text" className="form-control text-center border-secondary" value={product.qty} readOnly />
                                                        <button type="button" className="btn btn-outline-brown-sm"
                                                            onClick={() => { updateCartItem(product.id, product.product.id, product.qty + 1, 'add') }}
                                                            disabled={isLoading === `${product.id}-add`}>
                                                            {isLoading === `${product.id}-add` ? <Loading height={20} width={20} /> : '+'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="d-flex justify-content-center">
                                                    <h5>{product.product.price * product.qty}元</h5>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                <div className="d-flex justify-content-center">
                                                    <i className="bi bi-trash3-fill" onClick={() => { deleteCartItem(product.id) }}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* 加上 d-md-none 表示「在 768px 以上的中大型螢幕隱藏」 */}
                        <div className="cart-mobile-list d-md-none">
                            {cartItem.map((product) => (
                                <div key={product.id} className="card mb-3 p-3 border-0 border-bottom">
                                    <div className="d-flex align-items-center mb-3">
                                        <img src={product.product.imageUrl} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} alt="商品圖" />
                                        <div className="ms-3 flex-grow-1">
                                            <div className="fw-bold">{product.product.title}</div>
                                            <div className="text-danger small">NT${product.product.price}</div>
                                        </div>
                                        <i className="bi bi-trash3-fill text-muted" onClick={() => deleteCartItem(product.id)}></i>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="input-group input-group-sm" style={{ width: '100px' }}>
                                            <button className="btn btn-outline-secondary" type="button"
                                                onClick={() => updateCartItem(product.id, product.product.id, product.qty - 1, 'reduce')}
                                                disabled={product.qty <= 1 || isLoading === `${product.id}-reduce`}>
                                                -
                                            </button>
                                            <input type="text" className="form-control text-center bg-white" value={product.qty} readOnly />
                                            <button className="btn btn-outline-secondary" type="button"
                                                onClick={() => updateCartItem(product.id, product.product.id, product.qty + 1, 'add')}
                                                disabled={isLoading === `${product.id}-add`}>
                                                +
                                            </button>
                                        </div>
                                        <div className="fw-bold">小計: {product.product.price * product.qty}元</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-end mt-5">
                            <h4 className='mb-5'>總金額 : {cartItem.reduce((acc, item) => { return acc + (item.product.price * item.qty) }, 0)} 元</h4>
                        </div>
                        <div className="cart-form">
                            <h3>填寫訂單資訊</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="userName" className="required">訂購人姓名</label>
                                    <input type="text" className='form-control' id='userName' placeholder="請輸入訂購人姓名"
                                        {...register('userName', { required: "訂購人姓名為必填", minLength: { value: 2, message: '姓名至少 2 個字' } })} />
                                    <span className="error-message">{errors.userName ? errors.userName.message : ''}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="required">Email</label>
                                    <input type="email" className='form-control' id="email" placeholder="請輸入電子郵件"
                                        {...register('email', {
                                            required: "電子郵件為必填", pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "請輸入有效的 Email 格式",
                                            },
                                        })} />
                                    <span className="error-message">{errors.email ? errors.email.message : ''}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tel" className="required">訂購人電話</label>
                                    <input type="tel" className='form-control' id="tel" placeholder="請輸入手機號碼"
                                        {...register('tel', {
                                            required: '手機號碼為必填', pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: '手機號碼格式錯誤',
                                            },
                                        })} />
                                    <span className="error-message">{errors.tel ? errors.tel.message : ''}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address" className="required">訂購人地址</label>
                                    <input type="text" className='form-control' id="address" placeholder="請輸入地址"
                                        {...register('address', { required: '訂購人地址為必填', })} />
                                    <span className="error-message">{errors.address ? errors.address.message : ''}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">留言</label>
                                    <textarea type="text" className='form-control' id="message" placeholder="有想對我們說的話嗎?"
                                        {...register('message')} />
                                </div>
                                <button type="submit" className="btn-brown" disabled={isLoading !== '' || cartItem.length === 0}>{isLoading === 'loading-submit' ? <div className="custom-loading"><Loading height={30} width={30} /><span className="ms-2">訂單送出中...</span></div> : '送出訂單'}</button>
                            </form>
                        </div>
                    </div>}
                </div>
            </div>
        </div>

    </>);
};

export default Cart;