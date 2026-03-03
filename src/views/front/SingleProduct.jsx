import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import getProductsError from "../../utils/pushMessage";
import { Navigation, Autoplay } from "swiper/modules";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SingleProductSkeleton from "../../components/SingleProductSkeleton";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const SingleProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
    const [qty, setQty] = useState(1);
    const [mainImage, setMainImage] = useState('');
    const [cartItem, setCartItem] = useState([]);
    const [product, setproduct] = useState(null);
    const [productList, setproductList] = useState([]);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [swiperRef, setSwiperRef] = useState(null);

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
        setIsAddToCartLoading(true);
        try {
            const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, sentData);
            getCart();
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            dispatch(createAsyncMessage(error.response.data));
        } finally {
            setIsAddToCartLoading(false);
        }
    };

    const getRelatedProducts = async (category) => {
        try {
            let targetCategories = [];
            if (category === '高強度有氧' || category === '力量與重訓') {
                targetCategories = ['高強度有氧', '力量與重訓']
            } else if (category === '身心靈與核心' || category === '身心療癒') {
                targetCategories = ['身心靈與核心', '身心療癒']
            } else { targetCategories = [category] };

            const requests = targetCategories.map((cat) => { return axios.get(`${API_BASE}/api/${API_PATH}/products?category=${cat}`) })
            const responses = await Promise.all(requests);
            let combinedProduct = [];
            responses.forEach((res) => {
                return combinedProduct = [...combinedProduct, ...res.data.products];
            })
            const filterProduct = combinedProduct.filter(item => item.id !== id);
            setproductList(filterProduct);
        } catch (error) {
            getProductsError(error);
        }
    }

    useEffect(() => {
        const productDetail = async (id) => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
                const fetchedProduct = res.data.product;
                setproduct(fetchedProduct);
                setMainImage(fetchedProduct.imageUrl)
                getRelatedProducts(fetchedProduct.category);
            } catch (error) {
                getProductsError(error);
            } finally { setIsLoading(false) }
        }
        window.scrollTo(0, 0);
        productDetail(id);
        getCart();
    }, [id])

    if (!product) {
        return <SingleProductSkeleton />;
    }

    return (<>
        {isLoading ? <SingleProductSkeleton /> : <div className="container mt-3 fade-in">
            <h5 style={{ cursor: 'pointer' }} onClick={() => navigate('/product')}><i className="bi bi-reply-fill"></i>返回課程列表</h5>
            <div className="row gx-lg-5 gy-4 align-items-stretch mt-2">
                <div className="col-12 col-lg-4">
                    <div className="main-image-container shadow">
                        {mainImage && <img src={mainImage} className="product-main-img" alt="主圖" />}
                    </div>
                    <div className="thumb-scroll-container">
                        <img src={product.imageUrl} className="thumb-item" alt="主圖" onClick={() => { setMainImage(product.imageUrl) }} />
                        {product.imagesUrl?.map((image, index) => { return <img src={image} key={index} className="thumb-item" alt="更多圖片" onClick={() => { setMainImage(image) }} /> })}
                    </div>
                </div>
                <div className="col-12 col-lg-8">
                    <div id='colorBox' className="p-5 mb-3  rounded-4 custom-color-box  h-100 shadow" style={{ 'backgroundColor': 'rgb(253, 247, 245)' }}>
                        <h3 className="card-title mt-3 mb-3">{product.title}</h3><button type="button" className="btn btn-deepPink mb-4">{product.category}</button>
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
                            <button type="button" className="btn btn-outline-brown" onClick={() => { addToCart(product.id, qty) }} disabled={isAddToCartLoading}>
                                {isAddToCartLoading ? <div className="custom-loading"><Loading height={20} width={20} /> 正在加入購物車</div> : <div><i className="bi bi-cart-fill"></i>加入購物車</div>}</button>
                        </div>
                    </div>
                </div>
            </div>
            {productList.length > 0 && (<><h3 className="text-center"style={{ marginTop: '100px' }}>妳可能喜歡</h3>
                <div className="mt-3">
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={1}
                        breakpoints={{
                            // 當螢幕寬度 >= 640px
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            // 當螢幕寬度 >= 1024px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        centeredSlides={true}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false
                        }}
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        className="mySwiper"
                    >
                        {productList.map((item) => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <div className="card h-100 shadow">
                                        <img src={item.imageUrl} className="custom-card-swiperSlide-img" alt="產品主圖" />
                                        <div className="card-body">
                                            <h5 className="card-title text-center">{item.title}</h5>
                                            <button type="button" className="btn btn-deepPink" onClick={() => navigate(`/product/${item.id}`)}>前往了解課程</button>
                                        </div>
                                    </div></SwiperSlide>
                            )
                        })};
                    </Swiper>
                </div></>)}
        </div>}
    </>);
};

export default SingleProduct;