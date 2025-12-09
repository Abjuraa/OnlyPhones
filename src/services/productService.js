import api from "../api/axios";

export const getProducts = async () => {
    const response = await api.get("/api/client/product");
    return response.data;
}


export const getLatestProduct = async () => {
    const response = await api.get("/api/client/product/latest");
    return response.data;    
}

