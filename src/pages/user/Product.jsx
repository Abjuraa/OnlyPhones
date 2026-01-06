import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useProducts } from "../../hooks/useProduct"

export default function Product() {

    const { id } = useParams();
    const { getProductById, productById } = useProducts();

    useEffect(() => {
        getProductById(id);
    }, [id])


    const priceWhitDiscount = (price, discount) => {
        return price - (price * (discount / 100))
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat("es-CO").format(number)
    }

    console.log(productById)
    return (
        <div className="flex flex-col">
            <div className="flex flex-row w-screen justify-between items-center px-10 py-5">
                <h1 className="text-5xl font-semibold">{productById.model}</h1>
                <div className="flex flex-col items-end">
                    {productById.hasDiscount
                        ? <>
                            <h1 className="text-3xl font-semibold">${formatNumber(priceWhitDiscount(productById.price, productById.discount))}</h1>
                            <p className="text-xl text-gray-400 font-semibold line-through">${formatNumber(productById.price)}</p>
                        </>
                        : <h1 className="text-3xl font-semibold">${formatNumber(productById.price)}</h1>
                    }
                </div>
            </div>
        </div>
    )
}