import { useState } from "react";
import { getProducts, getLatestProduct, getProductsById, getProductsPaginador, createProducts, editProducts, deleteProductsById, editProductImage } from "../services/productService";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [latestProduct, setLatestProduct] = useState([]);
    const [productById, setProductById] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState([]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getProducts();
            setProducts(response);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    const getProductById = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getProductsById(id);
            setProductById(response);

        } catch (error) {
            setError(error.message);
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    const getLatestProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getLatestProduct();
            setLatestProduct(response);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    const productsPaginador = async (page = 0, size = 10) => {

        if (page < 0) page = 0;
        if (size < 0) size = 10;
        if (size > 24) size = 24;

        setLoading(true);
        setError(null);
        try {
            const data = await getProductsPaginador(page, size);
            setProductsPerPage({
                totalItems: data.totalItems,
                totalPages: data.totalPages,
                pageSize: data.pageSize,
                currentPage: data.currentPage,
                content: data.content
            })
        } catch (error) {
            const message =
                error?.response?.data?.message ?? "Error del servidor";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    const createProductHook = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await createProducts(data);
            return response
        } catch (error) {
            const message = error?.response?.data?.message ?? "Error del servidor";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    const editProduct = async (id, data) => {
        setError(null);
        setLoading(true);
        try {
            const response = await editProducts(id, data);
            return response
        } catch (error) {
            const message = error?.response?.data?.message ?? "Error del servidor";
            setError(message);
        } finally {
            setLoading(false);
        }
    }


    const editProductImageHook = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await editProductImage(id, data);
            return response;
        } catch (error) {
            const message = error?.response?.data?.message ?? "Error del servidor";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteProductsById(id);
            setSuccess(true);
        } catch (error) {
            const message = error?.response?.data?.message ?? "Error del servidor";
            setError(message);
        } finally {
            setLoading(false)
        }
    }


    return { products, latestProduct, productById, productsPerPage, createProductHook, productsPaginador, getAllProducts, getLatestProducts, getProductById, deleteProduct, setProductsPerPage, editProduct, editProductImageHook, loading, error, success };
}