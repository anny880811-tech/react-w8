import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-overlay">
                    <h1>律境｜生活動態美學</h1>
                    <h3>身隨律動，境由心生</h3>
                    <p>工作不是生活的全部，妳的感受才是，「律境」專為繁忙女性打造專屬運動提案<br />
                        每一次呼吸律動間，洗去職涯疲憊，陪伴妳在規律中，找回對生活的熱誠。</p>
                </div>
                <img src="https://images.pexels.com/photos/35215421/pexels-photo-35215421.jpeg" className="img-custom" />
            </section>
        </>
    );
};

export default Home;