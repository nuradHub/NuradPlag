import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ContextProvider from './components/context/Context.jsx'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
axios.defaults.withCredentials = true;

axios.defaults.baseURL = import.meta.env.VITE_CLIENT_URL;

axios.interceptors.request.use((config) => {
  try{

    const token = localStorage.getItem('token'); 

    if (token) {
      // Modern standard: Bearer <token>
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }catch (error){
    return Promise.reject(error);
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>,
)
