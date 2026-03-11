import { Outlet, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import footerLogo from '../assets/footer-logo.png'

const FrontendLayout = () => {
    const carts = useSelector((state) => state.cart.carts);
    return (
        <>
            <header>
                <nav className="custom-navbar">
                    <div className="nav-left-group">
                        <Link className="nav-logo" to='/'>
                            <img src={footerLogo} alt="律境 Logo" />
                        </Link>
                        <div className="nav-links-group">
                            <Link className="nav-link-item ms-0" to='/'>首頁</Link>
                            <Link className="nav-link-item" to='/about'>關於律境</Link>
                            <Link className="nav-link-item" to='/product'>課程列表</Link>
                        </div>
                    </div>

                    <div className="nav-login-group">
                        <Link className="nav-link-item position-relative fs-3" to='/cart'><i className="bi bi-cart-fill"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-8" style={{ fontSize: '0.8rem', padding: '0.25rem 0.35rem' }}>{carts.length}</span>
                        </Link>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="custom-footer mt-5">
                <div className="container py-1 text-center">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="footer-info-left">
                                <div className="logo-custom-footer"><img src={footerLogo} alt="律境 Logo" /></div>
                                <h4 className="text-white">律境｜生活動態美學</h4>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mt-md-4 mt-0">
                            <div className="footer-link-group">
                                <h4 className="text-white fw-bold mb-0 mb-md-2 text-md-start">本站資訊</h4>
                                <Link className="footer-link-item me-2" to='/about'>關於律境</Link>
                                <Link className="footer-link-item me-2" to='/product'>課程列表</Link>
                                <Link className="footer-link-item" to='/faq'>常見問題</Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="footer-social-group text-start">
                                <div className="social-icons-wrapper text-white pt-md-4 pt-2">
                                    <i className="bi bi-line fs-1 me-4"></i>
                                    <i className="bi bi-instagram fs-1 me-4"></i>
                                    <i className="bi bi-facebook fs-1"></i>
                                </div>
                                <div className="text-start text-white contact-info mt-2">
                                    <h6 className="text-white">聯絡我們 <i className="bi bi-telephone-fill ms-1"></i>：04-75262658</h6>
                                    <h6 className="text-white">場館地址：臺中市西屯區國安一路1688號</h6>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright-text text-white mt-n2 mb-2">
                            © 2026 律境｜生活動態美學，本站僅供學習使用，不提供商業用途
                        </div>
                </div>
            </footer>
        </>
    )
}

export default FrontendLayout;
