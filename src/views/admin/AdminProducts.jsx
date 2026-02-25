import axios from "axios";
import { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import AdminProductTable from "../../components/AdminProductTable";
import AdminProductModal from "../../components/AdminProductModal";
import AdminProductPagination from "../../components/AdminProductPagination";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import getProductsError from "../../utils/pushMessage";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
const defaultModalState = {
    "title": "",
    "category": "",
    "origin_price": "",
    "price": "",
    "unit": "",
    "description": "",
    "content": "",
    "is_enabled": false,
    "imageUrl": "",
    "imagesUrl": [],
};
const categories = ['身心療癒', '身心靈與核心', '燃脂動態', '功能性訓練', '力量與重訓', '器械皮拉提斯'];

const AdminProducts = () => {
    const [productList, setProductList] = useState([]);
    const productModalRef = useRef(null);
    const [temProduct, setTemProduct] = useState(defaultModalState);
    const [modalType, setModalType] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [pagination, setPagination] = useState({});
    const dispatch = useDispatch();

    const getProducts = async (page = 1) => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`);
            setProductList(res.data.products);
            setPagination(res.data.pagination);
            console.log(res.data)
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
            navigate('/login');
            return;
        }
        axios.defaults.headers.common['Authorization'] = token;

        productModalRef.current = new bootstrap.Modal('#productModal', {
            keyboard: false
        });
        getProducts();
    }, [navigate]);

    const handleUpdateProduct = async (e) => {
        let url = `${API_BASE}/api/${API_PATH}/admin/product`;
        let method = 'post';
        const filterImage = temProduct.imagesUrl?.filter((image) => image !== '');
        const payload = {
            ...temProduct,
            imagesUrl: filterImage,
        }
        if (modalType === 'edit') {
            url = `${API_BASE}/api/${API_PATH}/admin/product/${temProduct.id}`;
            method = 'put';
        }
        if (modalType === 'delete') {
            url = `${API_BASE}/api/${API_PATH}/admin/product/${temProduct.id}`;
            method = 'delete';
        }
        e.preventDefault();
        setIsLoading('replace');
        try {
            let res;
            if (modalType === 'delete') {
                res = await axios.delete(url);
            } else {
                res = await axios[method](url, {
                    data: payload,
                });
            }
            closeModal();
            getProducts();
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            alert('資料錯誤', error.response);
            dispatch(createAsyncMessage(error.response.data));
        } finally {
            setIsLoading('');
        }
    };

    const openModal = (type, product) => {
        setModalType(type)
        if (type === 'create') {
            setTemProduct(defaultModalState)
        } else {
            setTemProduct(product)
        }
        productModalRef.current.show();
    };

    const closeModal = () => {
        productModalRef.current.hide();
    };

    const formatValue = (target) => {
        const { type, checked, value } = target
        if (type === 'number') { return Number(value) || 0 };
        if (type === 'checkbox') { return checked ? 1 : 0 };
        return value;
    };


    const handleModalChange = (e) => {
        const { name } = e.target;
        setTemProduct((pre) => ({
            ...pre,
            [name]: formatValue(e.target)
        }))
    };

    const uploadImage = async (e) => {
        const file = e.target.files?.[0]
        if (!file) {
            return
        }
        setIsLoading('add');
        try {
            const formData = new FormData()
            formData.append('file-to-upload', file)
            const response = await axios.post(`${API_BASE}/api/${API_PATH}/admin/upload`, formData)
            setTemProduct((pre) => ({
                ...pre,
                imageUrl: response.data.imageUrl,
            }))

        } catch (error) {
            alert('資料錯誤', error.response);
        } finally {
            setIsLoading('');
        }
    }

    const handleImageChange = (e, index) => {
        const { value } = e.target;
        const newImages = [...temProduct.imagesUrl];
        newImages[index] = value;
        setTemProduct((pre) => ({
            ...pre,
            imagesUrl: newImages
        }))
    };

    const handleAddImage = () => {
        setTemProduct((pre) => ({
            ...pre,
            imagesUrl: pre.imagesUrl ? [...pre.imagesUrl, ''] : ['']
        }))
    };

    const handleRemoveImage = () => {
        setTemProduct((pre) => {
            if (pre.imagesUrl.length > 0) {
                return {
                    ...pre,
                    imagesUrl: pre.imagesUrl.slice(0, -1)
                }
            }
            return {
                ...pre,
                imageUrl: ''
            }
        })
    };

    return (<>
        <div className="container mt-3 ">
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h2 className="mt-4">產品列表</h2>
                <button type="button" className="btn btn-brown" onClick={() => { openModal('create') }}>建立新產品</button>
            </div>

            <AdminProductTable onOpenModal={openModal} products={productList} />
        </div>
        <AdminProductModal
            productModalRef={productModalRef}
            categories={categories}
            modalType={modalType}
            temProduct={temProduct}
            isLoading={isLoading}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
            onImageChange={handleImageChange}
            onModalChange={handleModalChange}
            onUpdateProduct={handleUpdateProduct}
            onUploadImage={uploadImage}
            onCloseModal={closeModal}
        />
        <AdminProductPagination pagination={pagination} getProducts={getProducts} />
    </>);
};

export default AdminProducts