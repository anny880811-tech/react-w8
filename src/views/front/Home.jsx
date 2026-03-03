import { Link, useNavigate } from "react-router-dom";
import About from "./About";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="hero">
                <div className="hero-overlay">
                    <div className="container px-4">
                        <h1>律境｜生活動態美學</h1>
                        <h3>身隨律動，境由心生</h3>
                        <p>「律境」專為繁忙女性打造專屬運動提案
                            <br className="d-none d-md-block" /> {/* 只有在 md 以上螢幕才換行 */}
                            呼吸律動間，洗去疲憊，陪伴妳在規律中找回生活熱誠。</p>
                        <button type='button' className="btn btn-pink mt-2" onClick={() => navigate('/product')}> 立即了解課程<i className="bi bi-caret-right-fill"></i></button>
                    </div>
                </div>
                <img src="https://images.pexels.com/photos/35215421/pexels-photo-35215421.jpeg" className="img-custom" />
            </section>
            <About />
        </>
    );
};

export default Home;