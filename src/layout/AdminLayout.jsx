import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {

    return (
        <>
            <header>
                <nav className="custom-navbar">
                    <div className="nav-links-group">
                        {/* <Link className="nav-link-item" to='/'>首頁</Link> */}
                        <Link className="nav-link-item" to='/admin/product'>產品列表</Link>
                        <Link className="nav-link-item" to='/admin/order'>訂單列表</Link>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="mt-5 text-center">
                <p>© 2026 我的網站</p>
            </footer>
        </>
    )
}

export default AdminLayout;
