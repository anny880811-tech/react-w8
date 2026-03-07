import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const res = await axios.post(`${API_BASE}/admin/signin`, {
                username: email,
                password,
            });
            const { token, expired } = res.data;
            document.cookie = `anToken=${token}; expires=${new Date(expired).toUTCString()}`;
            navigate('/admin/product');
        } catch (error) {
            alert('登入失敗',error.response?.data?.message);
        };
    };

    return (<>
        <section className="login-section">
            <div className="login-card">
                <h2 className="login-title">後台登入</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" {...register('email', {
                            required: "請輸入電子郵件", pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "請輸入有效的 Email 格式",
                            },
                        })} id="email" placeholder="請輸入電子郵件" />
                        <span>{errors.email ? errors.email.message : ''}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">密碼</label>
                        <input type="password" {...register('password', { required: '請輸入密碼' })} id="password" placeholder="請輸入密碼" />
                        <span>{errors.password ? errors.password.message : ''}</span>
                    </div>
                    <button type="submit" className="btn btn-brown">登入</button>
                </form>
            </div>
        </section>
    </>)
};

export default Login;