import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import getProductsError from '../../utils/pushMessage'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination, Navigation, Autoplay } from 'swiper/modules'
import Faq from './Faq'
import EnvironmentSection from '../../components/EnvironmentSection'

const API_BASE = import.meta.env.VITE_API_BASE
const API_PATH = import.meta.env.VITE_API_PATH

const Home = () => {
  const navigate = useNavigate()
  const [products, setproducts] = useState([])
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      // setIsLoading(false);
      try {
        const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`)
        setproducts(res.data.products)
      }
      catch (error) {
        getProductsError(error)
      }
    }
    getProducts()
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className={`hero ${heroImageLoaded ? 'is-visible' : 'is-loading'}`}>
        <div className="hero-overlay">
          <div className="container px-4">
            <h1>律境｜生活動態美學</h1>
            <h3>身隨律動，境由心生</h3>
            <p>
              「律境」專為繁忙女性打造專屬運動提案
              <br className="d-none d-md-block" />
              {' '}
              {/* 只有在 md 以上螢幕才換行 */}
              呼吸律動間，洗去疲憊，陪伴妳在規律中找回生活熱誠。
            </p>
            <button
              type="button"
              className="btn btn-pink mt-2"
              onClick={() => navigate('/product')}
            >
              {' '}
              立即了解課程
              <i className="bi bi-caret-right-fill"></i>
            </button>
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/35215421/pexels-photo-35215421.jpeg"
          className="img-custom"
          onLoad={() => { setHeroImageLoaded(true) }}
        />
      </section>
      <div className="container mt-5 text-center">
        <h2 className="mb-5">熱門課程推薦</h2>
        {products.length > 0 && (
          <Swiper
            // 1. 預設值（針對手機/極小螢幕，如 < 640px）
            slidesPerView={1.2} // 設定 1.2 張可以露出下一張的邊緣，提示使用者可以滑動
            spaceBetween={15} // 手機版間距小一點比較美觀
            freeMode={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            // 2. 響應式中斷點
            breakpoints={{
              // 手機：顯示 1.2 張，克制單張寬度
              0: {
                slidesPerView: 1.2,
                spaceBetween: 16,
              },
              // 平板：顯示 2.2 張
              768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              // 桌機：顯示 3 張，配合 max-width 維持精緻度
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[FreeMode, Pagination, Navigation, Autoplay]}
            className="home-env-swiper"
          >
            {products.map((product) => {
              return (
                <SwiperSlide key={product.id}>
                  <div className="course-card shadow-sm mx-auto">
                    <img
                      src={product.imageUrl}
                      className="course-img"
                      alt={product.title}
                    />
                    <div className="card-body">
                      <h5 className="text-truncate">{product.title}</h5>
                      <p className="course-content small text-muted">
                        {product.content}
                      </p>
                      <button
                        className="btn btn-brown btn-sm"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        了解課程
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
      </div>
      <div className="pt-2">
        <EnvironmentSection />
      </div>
      <div className="pb-5">
        <Faq />
      </div>
    </>
  )
}

export default Home
