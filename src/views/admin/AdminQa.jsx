import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getProductsError from "../../utils/pushMessage";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const AdminQa = () => {
    const [qa, setQa] = useState([]);
    const navigate = useNavigate();

    const fetchQaList = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/articles`);
            setQa(res.data.articles);
            console.log(res.data.articles);
        } catch (error) {
            getProductsError(error);
        }
    }

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
        fetchQaList();
    }, [navigate]);

    const section = [
        { title: 'Q＆A管理列表', tag: 'Q&A', id: 'qaAccordion' },
        { title: 'FAQ管理列表', tag: 'FAQ', id: 'faqAccordion' }
    ];

    return (<>
    
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <h2 className="mt-4">問題管理列表</h2>
                <button type="button" className="btn btn-brown" onClick={() => { }}>建立新問答</button>
            </div>
        </div>
        {section.map((group) => {
            return (
                <div className="ps-4 pe-3 mb-5" key={group.id}>
                    <h3 className="text-center mb-3">{group.title}</h3>
                    <div className="accordion custom-accordion shadow" id="accordionFlushExample">
                        {qa.filter((item) => item.tag?.includes(group.tag))
                            .map((item, index) => {
                                return (<div key={item.id}>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="flush-headingOne">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                                {item.title}
                                            </button>
                                        </h2>
                                        <div id={`flush-${index}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne">
                                            <div className="accordion-body d-flex justify-content-between align-items-center">{item.description} <button type="button" className="btn btn-brown">編輯</button></div>
                                        </div>
                                    </div>
                                </div>)
                            })}
                    </div>
                </div>
            )
        })}
    </>)
};

export default AdminQa;