import api from "../api/axios";

export const getProducts = async () => {
    const response = await api.get("/api/client/product");
    return response.data;
}

export const getProductsById = async (id) => {
    const response = await api.get(`api/client/product/${id}`);
    return response.data;
}

export const getLatestProduct = async () => {
    const response = await api.get("/api/client/product/latest");
    return response.data;
}

export const getProductsPaginador = async (page, size) => {

    if (page < 0) page = 0;
    if (size <= 0) size = 10;
    const response = await api.get("api/admin/product/paginador", {
        params: {
            page: page,
            size: size
        }
    });
    return response.data;
}

export const editProducts = async (id, data) => {
    const response = await api.put(`api/admin/updateproduct/${id}`, data);
    return response.data;
}

export const deleteProductsById = async (id) => {
    const response = await api.delete(`api/admin/deleteproduct/${id}`);
    return response.data;
}
