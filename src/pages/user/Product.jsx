import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useProducts } from "../../hooks/useProduct"

export default function Product() {

    const { id } = useParams();
    const { getProductById, productById } = useProducts();

    useEffect(() => {
        getProductById(id);
    }, [id])


    console.log("Product ID:", id);

    return (
        <div>
            <h1>{ productById.model}</h1>
            <img src={productById.image} alt="" />
        </div>
    )
}