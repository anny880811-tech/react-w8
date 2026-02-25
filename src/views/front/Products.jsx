import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";
import getProductsError from "../../utils/pushMessage";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Products = () => {
    const [isLoading, setIsLoading] = useState('');
    const [IsPageLoading, setIsPageLoading] = useState(true);
    const [products, setproducts] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`)
                setproducts(res.data.products);
                getCart();
            } catch (error) {
                getProductsError(error);
            } finally { setIsPageLoading(false); }
        };
        getProducts();
    }, []);

    const handleView = (id) => { navigate(`/product/${id}`) }

    const getCart = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
            setCartItem(res.data.data.carts);
        } catch (error) {
            getProductsError(error);
        }
    };

    const addToCart = async (product_id, qty) => {
        const sentData = {
            'data': {
                'product_id': product_id,
                'qty': qty
            }
        }
        try {
            setIsLoading(product_id);
            const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, sentData)
            getCart();
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            dispatch(createAsyncMessage(error.response.data));
        } finally {
            setIsLoading('');
        }
    };
    if (IsPageLoading) {
        return <div className="container mt-5">
            <div className="row gx-3 gy-5">
                {Array.from({ length: 6 }, (_, i) => {
                    return (<div className="col-12 col-md-6 col-lg-4" key={i}>
                        <div className="skeleton-card">
                            <div className="skeleton-img"></div>
                            <div className="skeleton-body"></div>
                            <div className="skeleton-title"></div>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-btn-group">
                                <div className="skeleton-btn"></div>
                                <div className="skeleton-btn"></div>
                            </div>
                        </div>
                    </div>
                    )
                })}

            </div>
        </div>
    }
    return (<>
        <div className="container mt-5">
            <div className="row gx-3 gy-5">

                {products.map((product) => {
                    return (
                        <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                            <div className="custom-card">
                                <img src={product.imageUrl} className="custom-card-img" alt="主圖" />
                                <div className="custom-card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.category}</p>
                                    <p className="card-text mb-3">原價 : <del>{product.origin_price} 元</del> / 售價 : {product.price} 元</p>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-outline-brown" onClick={() => handleView(product.id)}>查看更多</button>
                                        <button type="button" className="btn btn-outline-brown" onClick={() => { addToCart(product.id, 1) }} disabled={isLoading === product.id}>
                                            {isLoading === product.id ? <div className="custom-loading"><Loading height={20} width={20} /> 正在加入購物車</div> : <div><i className="bi bi-cart-fill"></i>加入購物車</div>}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </>);
};

export default Products
