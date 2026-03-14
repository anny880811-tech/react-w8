import axios from 'axios'
import * as bootstrap from 'bootstrap'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import getProductsError from '../../utils/pushMessage'
import AdminQaModal from '../../components/AdminQaModal'

const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

const AdminQa = () => {
  const [qa, setQa] = useState([])
  const modalRef = useRef(null)
  const modalInstance = useRef(null)
  const navigate = useNavigate()
  const defaultModalState = {
    title: '',
    description: '',
    image: '',
    tag: '',
    create_at: 1,
    author: 'no-content',
    isPublic: false,
    content: 'no-content',
  }
  const [temQuestion, setTemQuestion] = useState(defaultModalState)
  const [modalType, setModalType] = useState('add')
  const catgories = ['Q&A', 'FAQ']

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setTemQuestion(pre => ({
      ...pre,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleAddQuestion = async () => {
    let url = `${API_BASE}/api/${API_PATH}/admin/article`
    let method = 'post'
    if (modalType === 'edit' || modalType === 'delete') {
      url = `${API_BASE}/api/${API_PATH}/admin/article/${temQuestion.id}`
      method = modalType === 'edit' ? 'put' : 'delete'
    }
    const payload = {
      data: {
        ...temQuestion,
        tag: Array.isArray(temQuestion.tag) ? temQuestion.tag : [temQuestion.tag],
      },
    }
    try {
      if (method === 'delete') {
        await axios.delete(url)
      }
      else {
        await axios[method](url, payload)
      }
      fetchQaList()
    }
    catch (error) {
      getProductsError(error)
    }
  }

  const fetchQaList = async () => {
    let allArticles = []
    try {
      const firstResponse = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/articles?page=1`,
      )
      const data = firstResponse.data
      allArticles = [...data.articles]
      const totalPages = data.pagination.total_pages
      for (let i = 2; i <= totalPages; i++) {
        const response = await axios.get(
          `${API_BASE}/api/${API_PATH}/admin/articles?page=${i}`,
        )
        allArticles = [...allArticles, ...response.data.articles]
      }
      setQa(allArticles)
    }
    catch (error) {
      getProductsError(error)
    }
  }

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('anToken='))
      ?.split('=')[1]
    if (!token) {
      alert('您尚未登入，請重新登入')
      navigate('/admin/login')
      return
    }
    axios.defaults.headers.common['Authorization'] = token
    fetchQaList()
  }, [navigate])

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new bootstrap.Modal(modalRef.current)
    }
  }, [])

  const openModal = (method, item = defaultModalState) => {
    setModalType(method)
    setTemQuestion({ ...defaultModalState, ...item })
    modalInstance.current?.show()
    fetchQaList()
  }
  const closeModal = () => {
    modalInstance.current?.hide()
  }

  const section = [
    { title: 'Q＆A管理列表', tag: 'Q&A', id: 'qaAccordion' },
    { title: 'FAQ管理列表', tag: 'FAQ', id: 'faqAccordion' },
  ]

  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
          <h2 className="mt-4">問題管理列表</h2>
          <button
            type="button"
            className="btn btn-brown"
            onClick={() => {
              openModal('add')
            }}
          >
            建立新問答
          </button>
        </div>
      </div>
      <AdminQaModal
        modalRef={modalRef}
        modalType={modalType}
        temQuestion={temQuestion}
        onHandleInputChange={handleInputChange}
        catgories={catgories}
        onHandleAddQuestion={handleAddQuestion}
        closeModal={closeModal}
      />
      {section.map((group) => {
        return (
          <div className="ps-4 pe-3 mb-5" key={group.id}>
            <h3 className="text-center mb-3">{group.title}</h3>
            <div
              className="accordion custom-accordion shadow"
              id="accordionFlushExample"
            >
              {qa
                .filter(item => item.tag?.includes(group.tag))
                .map((item) => {
                  return (
                    <div key={item.id}>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-${item.id}`}
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            {item.title}
                          </button>
                        </h2>
                        <div
                          id={`flush-${item.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingOne"
                        >
                          <div className="accordion-body d-flex justify-content-between align-items-center">
                            {item.description}
                            <div
                              className="btn-group me-3"
                              role="group"
                              aria-label="Basic outlined example"
                            >
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => { openModal('edit', item) }}
                              >
                                編輯
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => { openModal('delete', item) }}
                              >
                                刪除
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default AdminQa
