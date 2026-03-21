import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from 'swiper/modules'
import pexels from '../assets/pexels-photo-18499500.png'
import gym from '../assets/03.png'
import classroom from '../assets/classroom.png'
import gym1 from '../assets/06.png'
import gym3 from '../assets/05.jpeg'
import gym2 from '../assets/02.png'

const rightImg = [pexels, gym, gym1]
const leftImg = [classroom, gym2, gym3]

function EnvironmentSection() {
  return (
    <>
      <div className="pb-3 text-center">
        <h2 className="mt-5">教室環境</h2>
        <div className="about-intro-box mt-4 mb-3 shadow">
          <div>
            律境規劃多元專屬教室空間，讓每一種節奏，都能自在展開。
            <p />
            館內設有五間舞蹈教室，以及重力訓練教室、拳擊教室、皮拉提斯器械教室各一間，
            <p />
            重力訓練教室備有完善訓練設備，包含啞鈴、槓鈴架及多樣輔助器材，提供穩定且充足的訓練支持。
            <p />
            依不同課程需求打造合適場域，讓練習更專注，也更安心。
            <p />
            <br />
            歡迎親自走進律境，感受空間的節奏與溫度。
            <p />
            重力訓練教室、有啞鈴、槓鈴架各種豐富的器材等...，歡迎前往參觀
          </div>
          {rightImg.length > 0
            && (
              <Swiper
                autoHeight={true}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                navigation={true}
                pagination={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="about-env-swiper mb-0 mb-md-3"
              >
                {rightImg.map((item, index) => {
                  return (
                    <SwiperSlide>
                      <div className="responsive-container">
                        {/* 右圖作為「底圖」，它填滿整個容器 */}
                        <div className="panel panel-right">
                          <img src={item} alt="教室長圖" loading="lazy" />
                        </div>
                        {/* 左圖作為「覆蓋層」，它蓋在右圖上面，並切出斜邊 */}
                        <div className="panel panel-left">
                          <img src={leftImg[index]} alt="教室方圖" loading="lazy" />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            )}

        </div>
      </div>
    </>
  )
}

export default EnvironmentSection
