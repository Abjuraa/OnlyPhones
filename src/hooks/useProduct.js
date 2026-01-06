import { useState } from "react";
import { getProducts, getLatestProduct, getProductsById } from "../services/productService";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [latestProduct, setLatestProduct] = useState([]);
    const [productById, setProductById] = useState([]);
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

    return { products, latestProduct, productById, getAllProducts, getLatestProducts, getProductById, loading, error };
}