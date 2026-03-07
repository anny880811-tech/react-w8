import Swal from "sweetalert2";

const getProductsError = (error) => {
    const message = error?.response?.data?.message || '發生未知錯誤';
    Swal.fire({
        title: '失敗',
        text: message,
        icon: 'error',
        confirmButtonColor: 'rgb(109, 77, 67)',
    });
};

export default getProductsError;