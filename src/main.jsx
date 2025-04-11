import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Css/index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";   
import { BrowserRouter } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ScrollToTop from './components/ScrollTop.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
    <App />
    </BrowserRouter>
  </StrictMode>,
)

