import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Faq = () => {
    const [faq, setFaq] = useState([]);

    useEffect(() => {

        window.scrollTo(0, 0);
        fetchQaList();
    }, []);

    const fetchQaList = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/articles`);
            setFaq(res.data.articles);
        } catch (error) {
            getProductsError(error);
        }
    }
const faqItems = faq.filter((item)=>item.tag&& item.tag.includes('FAQ'))

    return (<>
        <div className="container">
            <div className="mt-5">
                <h2 className="mb-4 text-center">常見問題</h2>
                <div className="accordion custom-accordion shadow" id="accordionFlushExample">
                    {faqItems.map((item, index) => {
                        return (
                            <div className="accordion-item" key={item.title}>
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                        {item.title}
                                    </button>
                                </h2>
                                <div id={`flush-${index}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne">
                                    <div className="accordion-body">{item.description}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>);
};

export default Faq;