import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import Loading from "../../components/Loading";
import getProductsError from "../../utils/pushMessage";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import { addToCartAsync, getCartAsync } from "../../slice/cartSlice";
import useMessage from "../../hooks/useMessage";


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Products = () => {
    const [isLoading, setIsLoading] = useState('');
    const [IsPageLoading, setIsPageLoading] = useState(true);
    const [products, setproducts] = useState([]);
    // const [cartItem, setCartItem] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showError, showSuccess } = useMessage();

    const [tempSearch, setTempSearch] = useState(searchParams.get("q") || "");

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`)
                setproducts(res.data.products);
                //getCart();
            } catch (error) {
                getProductsError(error);
            } finally { setIsPageLoading(false); }
        };
        getProducts();
    }, [dispatch]);
    const categories = useMemo(() => {
        // 1. 遍歷所有產品，取出分類名稱
        const allCategory = products.map((product) => { return product.category });
        // 2. 利用 Set 的特性去除重複的分類
        const categoryList = new Set(allCategory);
        // 3. 將 Set 轉回陣列格式，以便在 JSX 中使用 map 渲染
        return [...categoryList];
    }, [products]);


    //const currentCategory = searchParams.get('category');
    // const filteredProducts = useMemo(() => {
    //     if (!currentCategory) {
    //         return products;
    //     }
    //     return products.filter((product) => { return product.category === currentCategory })
    // }, [products, currentCategory]);

    //-------------------
    const currentCategory = searchParams.get('category');
    const searchQuery = searchParams.get('q') || ''; // 新增：取得 URL 中的搜尋參數

    // --- 修改：filteredProducts 邏輯 ---
    const filteredProducts = useMemo(() => {
        let result = products;

        // 1. 先篩選分類
        if (currentCategory) {
            result = result.filter((product) => product.category === currentCategory);
        }

        // 2. 再篩選關鍵字
        if (searchQuery) {
            result = result.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return result;
    }, [products, currentCategory, searchQuery]);
    // ----------------------------------

    // --- 新增：處理搜尋提交 ---
    const handleSearch = (e) => {
        e.preventDefault();
        // 更新 URL 參數，這會觸發 filteredProducts 重新計算
        setSearchParams({
            category: currentCategory || '',
            q: tempSearch
        });
    };
    //------------------------

    const handleView = (id) => { navigate(`/product/${id}`) }

    // const getCart = async () => {
    //     try {
    //         const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
    //         setCartItem(res.data.data.carts);
    //     } catch (error) {
    //         getProductsError(error);
    //     }
    // };

    const addToCart = async (product_id, qty = 1) => {
        const sentData = {
            'data': {
                'product_id': product_id,
                'qty': qty
            }
        }
        try {
            setIsLoading(product_id);
            //const res = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, sentData)
            //getCart();
            await dispatch(addToCartAsync(sentData));
            showSuccess('已加入購物車');
        } catch (error) {
            showError(error.response.data.message);
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
        <div className="container mt-2 mt-md-4">
            <nav className="category-nav">
                <ul className="category-nav__list">
                    <li className="category-nav__item">
                        <Link to='/product' className={`category-nav__link ${!currentCategory ? 'category-nav__link--active' : ''}`} >全部課程</Link>
                    </li>
                    {categories.map((item) => {
                        return <li className="category-nav__item" key={item}>
                            <Link to={`/product?category=${item}`} className={`category-nav__link ${currentCategory === item ? 'category-nav__link--active' : ''}`}>{item}</Link>
                        </li>
                    })}
                </ul>
            </nav>
        </div>
        <div className="container mt-1 mt-md-3">
            <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                    <h3 className="mb-0 mt-2 mt-md-0 product-page-title">{currentCategory ? `${currentCategory}` : '全部課程'}</h3>
                </div>
                <div className="col-12 col-md-3 ms-auto mb-3 search-container-right">
                    <form className="search-form mt-3" onSubmit={handleSearch}>
                        <div className="search-input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="搜尋課程..."
                                value={tempSearch}
                                onChange={(e) => setTempSearch(e.target.value)}
                            />
                            <span className="search-icon"><i className="bi bi-search"></i></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="container mt-2">
            <div className="row gx-3 gy-5">
                {filteredProducts.map((product) => {
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
