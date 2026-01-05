import { useState } from "react";
import { getProducts, getLatestProduct } from "../services/productService";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [latestProduct, setLatestProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getProducts();
            console.log("response", response);
            setProducts(response);
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

    return { products, latestProduct, getAllProducts, getLatestProducts, loading, error };
}