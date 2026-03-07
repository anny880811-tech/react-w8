import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartAsync } from "../../slice/cartSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import pexels from '../../assets/pexels-photo-18499500.png';
import gym from '../../assets/03.png'
import classroom from '../../assets/classroom.png'
import gym1 from '../../assets/06.png';
import gym3 from '../../assets/05.jpeg'
import gym2 from '../../assets/02.png'
import getProductsError from "../../utils/pushMessage";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const rightImg = [pexels, gym, gym1];
const leftImg = [classroom, gym2, gym3];


const About = () => {
    const [qa, setQa] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                await dispatch(getCartAsync()).unwrap();
            } catch (error) {
                showError(error.message);
            }
        })()
        window.scrollTo(0, 0);
        fetchQaList();
    }, [dispatch]);

    const fetchQaList = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/articles`);
            setQa(res.data.articles);
        } catch (error) {
            getProductsError(error);
        }
    }
    const qaItems = qa.filter((item) => item.tag && item.tag.includes('Q&A'));

    return (<>
        <div className="container mt-5 text-center">
            <h2 className="mt-3">關於律境</h2>
            <div className="about-intro-box mt-4 mb-3 shadow">
                <div>
                    在節奏快速的城市裡，妳總在多重角色之間流轉。<p />
                    工作、家庭、責任與期待，填滿了時間，卻漸漸稀釋了感受。<p />
                    律境因此而生。<p />
                    <br />
                    我們相信，運動不只是鍛鍊身體，更是一種回到自我的方式。<p />
                    專為女性設計的運動提案，不強調比較，不追求極限，<p />
                    而是在呼吸與律動之間，重新建立身心的平衡與節奏。<p />
                    在律境，妳可以慢下來，也可以堅定前行，可以釋放壓力，也可以找回力量。<p />
                    <br />
                    我們陪伴妳在規律之中，找回對生活的熱誠。<p />
                    身隨律動，境由心生。
                </div>
            </div>
            <div className="mt-5">
                <h2 className="mb-4">Q＆A</h2>
                <div className="accordion custom-accordion shadow" id="accordionFlushExample">
                    {qaItems.map((item, index) => {
                        return (
                            <div className="accordion-item" key={item.title}>
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                        {item.title}
                                    </button>
                                </h2>
                                <div id={`flush-${index}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne">
                                    <div className="accordion-body">{item.description}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="pb-5">
                <h2 className="mt-5">教室環境</h2>
                <div className="about-intro-box mt-4 mb-3 shadow">
                    <div>
                        律境規劃多元專屬教室空間，讓每一種節奏，都能自在展開。<p />
                        館內設有五間舞蹈教室，以及重力訓練教室、拳擊教室、皮拉提斯器械教室各一間，<p />
                        重力訓練教室備有完善訓練設備，包含啞鈴、槓鈴架及多樣輔助器材，提供穩定且充足的訓練支持。<p />
                        依不同課程需求打造合適場域，讓練習更專注，也更安心。<p />
                        <br />
                        歡迎親自走進律境，感受空間的節奏與溫度。<p />
                        重力訓練教室、有啞鈴、槓鈴架各種豐富的器材等...，歡迎前往參觀
                    </div>
                    <Swiper
                        autoHeight={true}
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false
                        }}
                        navigation={true}
                        pagination={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                        className="about-env-swiper"
                    >
                        {rightImg.map((item, index) => {
                            return <SwiperSlide><div className="responsive-container">
                                {/* 右圖作為「底圖」，它填滿整個容器 */}
                                <div className="panel panel-right">
                                    <img src={item} alt="教室長圖" />
                                </div>
                                {/* 左圖作為「覆蓋層」，它蓋在右圖上面，並切出斜邊 */}
                                <div className="panel panel-left">
                                    <img src={leftImg[index]} alt="教室方圖" />
                                </div>
                            </div>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </div>
            </div>
        </div>

    </>);
};

export default About;