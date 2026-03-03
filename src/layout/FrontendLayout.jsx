import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logoImg from '../assets/logo.svg'

const FrontendLayout = () => {
    const carts = useSelector((state) => state.cart.carts);
    return (
        <>
            <header>
                <nav className="custom-navbar">
                    <div className="nav-left-group">
                        <Link className="nav-logo" to='/'>
                            <img src={logoImg} alt="律境 Logo" />
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
            <footer className="mt-5 text-center">
                <p style={{ color: ' rgb(249, 149, 121)' }}>© 2026 我的網站</p>
            </footer>
        </>
    )
}

export default FrontendLayout;
