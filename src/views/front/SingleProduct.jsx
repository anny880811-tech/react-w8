import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import getProductsError from "../../utils/pushMessage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const SingleProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [qty, setQty] = useState(1);
    const [mainImage, setMainImage] = useState('');
    const [cartItem, setCartItem] = useState([]);
    const [product, setproduct] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch();


    const getCart = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
            setCartItem(res.data.data.carts)
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
            setIsLoading(true);
            const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, sentData);
            getCart();
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            dispatch(createAsyncMessage(error.response.data));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const productDetail = async (id) => {
            try {
                const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
                setproduct(res.data.product);
                setMainImage(res.data.product.imageUrl)
            } catch (error) {
                getProductsError(error);
            }
        }
        productDetail(id);
        getCart();
    }, [id])

    return (<>
        <div className="container mt-5 fade-in">
            <div className="row gx-lg-5 gy-4">
                <div className="col-12 col-lg-4">
                    <div className="main-image-container">
                        {mainImage && <img src={mainImage} className="product-main-img" alt="主圖" />}
                    </div>
                    <div className="thumb-scroll-container">
                        <img src={product.imageUrl} className="thumb-item" alt="主圖" onClick={() => { setMainImage(product.imageUrl) }} />
                        {product.imagesUrl?.map((image, index) => { return <img src={image} key={index} className="thumb-item" alt="更多圖片" onClick={() => { setMainImage(image) }} /> })}
                    </div>
                </div>
                <div className="col-12 col-lg-8">
                    <div id='colorBox' className="p-5 mb-3  rounded custom-color-box " style={{ 'backgroundColor': 'rgb(253, 247, 245)' }}>
                        <h3 className="card-title mb-2">{product.title}</h3><button type="button" className="btn btn-deepPink mb-3">{product.category}</button>
                        <h5 className="card-text">{product.content}</h5>
                        <p className="card-text">{product.description}</p>
                        <div className="price-group mb-1 mt-4">
                            {/* 手機版：兩行垂直排列 / 桌機版：一行水平對齊 */}
                            <div className="d-flex flex-column flex-md-row align-items-md-end gap-2">
                                <span className="text-secondary text-decoration-line-through fs-6">
                                    NT$ {product.origin_price?.toLocaleString()}
                                </span>
                                <span className="text-deep-brown fw-bold fs-2 lh-1">
                                    <span className="fs-5 me-1">NT$</span>
                                    {product.price?.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="qtySelect" className="form-label"></label>
                            <div className="d-flex align-items-center">
                                <select className="form-select w-auto" id="qtySelect" value={qty} onChange={(e) => { setQty(Number(e.target.value)) }}>
                                    {Array.from({ length: 15 }, (_, i) => {
                                        const num = i + 1;
                                        return (<option key={num} value={num}>{num}</option>)
                                    })}</select><span className="ms-2 fs-5 mb-0" style={{ 'color': 'rgb(109, 77, 67)' }} >{product.unit}</span>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-brown" onClick={() => { addToCart(product.id, qty) }} disabled={isLoading}>
                                {isLoading ? <div className="custom-loading"><Loading height={20} width={20} /> 正在加入購物車</div> : <div><i className="bi bi-cart-fill"></i>加入購物車</div>}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default SingleProduct;