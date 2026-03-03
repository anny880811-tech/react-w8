import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './scss/all.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
