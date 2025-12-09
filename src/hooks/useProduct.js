import { useEffect, useState } from "react";
import { getProducts, getLatestProduct } from "../services/productService";

export const useProducts = () => {
    const [product, setProduct] = useState([]);
    const [latestProduct, setLatestProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                const latestProduct = await getLatestProduct();
                setLatestProduct(latestProduct);
                setProduct(data);
            } catch (error) {
                setError(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [])

    return { product, latestProduct, loading, error };
}