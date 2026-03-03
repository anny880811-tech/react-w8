
const About = () => {
    return (<>
        <div className="container mt-5 text-center">
            <h2 className="mt-3">關於律境</h2>
            <h5 className="text-center mt-4 mb-3">律境，是為女性而存在的運動場域。<p />
                我們相信，身體有自己的節奏，生活也應如此。<p />
                因此，我們設計的不只是課程，而是一種讓身心回到平衡的方式。<p />
                在呼吸與律動之間，重拾專注，釋放疲憊，讓生活重新綻放光芒。<p />
                這裡不是競技場，<p />
                而是一段與自己並肩同行的旅程。</h5>
            <h2 className="mt-5">教室環境</h2>
            <div className="responsive-container mt-3">
                {/* 右圖作為「底圖」，它填滿整個容器 */}
                <div className="panel panel-right">
                    <img src="/src/assets/pexels-photo-18499500.png" alt="教室長圖" />
                </div>

                {/* 左圖作為「覆蓋層」，它蓋在右圖上面，並切出斜邊 */}
                <div className="panel panel-left">
                    <img src="/src/assets/classroom.png" alt="教室方圖" />
                </div>
            </div>
        </div>

    </>);
};

export default About;