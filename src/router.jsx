import { createHashRouter } from "react-router-dom";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/front/Home";
import NotFound from "./views/front/NotFound";
import SingleProduct from "./views/front/SingleProduct";
import Cart from "./views/front/Cart";
import Products from "./views/front/Products";
import About from "./views/front/About";
import Login from "./views/admin/Login";
import AdminProducts from "./views/admin/AdminProducts";
import AdminLayout from "./layout/AdminLayout";
import AdminOrders from "./views/admin/AdminOrders";
import AdminQa from "./views/admin/AdminQa";

export const router = createHashRouter([
    {
        path: '/',
        element: <FrontendLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'product',
                element: <Products />,
            },
            {
                path: 'product/:id',
                element: <SingleProduct />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'product',
                element: <AdminProducts />,
            },
            {
                path: 'order',
                element: <AdminOrders />,
            },
            {
                path: 'qa',
                element: <AdminQa />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);
