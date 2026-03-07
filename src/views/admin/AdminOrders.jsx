import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getProductsError from "../../utils/pushMessage";


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrder = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/orders`)
            setOrders(res.data.orders);
        } catch (error) {
            getProductsError(error);
        }
    }



    const navigate = useNavigate();

      useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("anToken="))
            ?.split("=")[1];
        if (!token) {
            alert('您尚未登入，請重新登入');
            navigate('/admin/login');
            return;
        }
        axios.defaults.headers.common['Authorization'] = token;
        fetchOrder();
    }, [navigate]);

    return (<>
        <div className="container mt-3 ">
            <h2 className="mt-4">訂單管理列表</h2>
        </div>
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped align-middle responsive-table">
                        <thead>
                            <tr>
                                <th scope="col">訂單編號</th>
                                <th scope="col">客戶姓名</th>
                                <th scope="col">電話</th>
                                <th scope="col">地址</th>
                                <th scope="col">商品明細</th>
                                <th scope="col">訂單總金額</th>
                                <th scope="col">留言</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                return (
                                    <tr key={order.id}>
                                        <th data-label="訂單編號" className="text-break">{order.id}</th>
                                        <td data-label="客戶姓名">{order.user?.name}</td>
                                        <td data-label="電話">{order.user?.tel}</td>
                                        <td data-label="地址">{order.user?.address}</td>
                                        <td data-label="商品明細"><ol>
                                            {Object.values(order.products || {}).map((product, index) => { return (<li key={index}>{product.product.title}</li>) })}
                                        </ol></td>
                                        <td data-label="總金額">${order.total}</td>
                                        <td data-label="留言">{order.message}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </>);
};

export default AdminOrders;