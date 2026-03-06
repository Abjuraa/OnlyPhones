import axios from "axios";
const API_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: API_BACKEND_URL,

    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("tokenOnlyPhones");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api