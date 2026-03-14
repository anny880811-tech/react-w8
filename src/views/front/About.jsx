import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartAsync } from '../../slice/cartSlice'
import getProductsError from '../../utils/pushMessage'
import useMessage from '../../hooks/useMessage'
import EnvironmentSection from '../../components/EnvironmentSection'
import AboutSkeleton from '../../components/AboutSkeleton'

const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

const About = () => {
  const [qa, setQa] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { showError } = useMessage()

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getCartAsync()).unwrap()
      }
      catch (error) {
        showError(error.message)
      }
    })()
    const fetchQaList = async () => {
      let allArticles = []
      setIsLoading(true)
      try {
        const fristResponse = await axios.get(
          `${API_BASE}/api/${API_PATH}/articles?page=1`,
        )
        const data = fristResponse.data
        allArticles = [...data.articles]
        const totalPages = data.pagination.total_pages
        for (let i = 2; i <= totalPages; i++) {
          const response = await axios.get(
            `${API_BASE}/api/${API_PATH}/articles?page=${i}`,
          )
          allArticles = [...allArticles, ...response.data.articles]
        }
        setQa(allArticles)
      }
      catch (error) {
        getProductsError(error)
      }
      finally { setIsLoading(false) }
    }
    window.scrollTo(0, 0)
    fetchQaList()
  }, [dispatch])

  const qaItems = qa.filter(item => item.tag && item.tag.includes('Q&A'))

  if (isLoading) {
    return <AboutSkeleton />
  }

  return (
    <>
      <div className="container mt-5 text-center">
        <h2 className="mt-3">關於律境</h2>
        <div className="about-intro-box mt-4 mb-3 shadow">
          <div>
            在節奏快速的城市裡，妳總在多重角色之間流轉。
            <p />
            工作、家庭、責任與期待，填滿了時間，卻漸漸稀釋了感受。
            <p />
            律境因此而生。
            <p />
            <br />
            我們相信，運動不只是鍛鍊身體，更是一種回到自我的方式。
            <p />
            專為女性設計的運動提案，不強調比較，不追求極限，
            <p />
            而是在呼吸與律動之間，重新建立身心的平衡與節奏。
            <p />
            在律境，妳可以慢下來，也可以堅定前行，可以釋放壓力，也可以找回力量。
            <p />
            <br />
            我們陪伴妳在規律之中，找回對生活的熱誠。
            <p />
            身隨律動，境由心生。
          </div>
        </div>
        <div className="mt-5">
          <h2 className="mb-4">Q＆A</h2>
          <div
            className="accordion custom-accordion shadow"
            id="accordionFlushExample"
          >
            {qaItems.map((item, index) => {
              return (
                <div className="accordion-item" key={item.title}>
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-${index}`}
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      {item.title}
                    </button>
                  </h2>
                  <div
                    id={`flush-${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                  >
                    <div className="accordion-body">{item.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <EnvironmentSection />
      </div>
    </>
  )
}

export default About
