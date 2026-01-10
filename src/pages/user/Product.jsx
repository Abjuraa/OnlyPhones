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
        <div className="flex flex-1 flex-col">
            <div className="flex flex-row justify-between items-center px-5 py-5">
                <div className="flex text-sm">
                    <a
                        className="font-semibold text-gray-500"
                        href="/privada/categorias"
                    >
                        Catálogo
                    </a>
                    <h1 className="font-semibold text-gray-500"> <span className="px-2">></span>{productById.model}</h1>
                </div>
                <div className="flex flex-row gap-3">
                    <h1 className="bg-green-200 rounded-lg p-1 text-sm text-green-800 font-semibold">{productById.hasAvailable ? 'Disponible' : 'No disponible'}</h1>
                    <h1 className="bg-gray-200 rounded-lg p-1 text-sm font-semibold">{productById.unitsAvailable == 1 ? "Unidad Única" : `${productById.unitsAvailable} Unidades`}</h1>
                </div>
            </div>
            <div className="flex flex-row justify-between px-5 pt-5">
                <div className="flex rounded-lg basis-192">
                    <img src={productById.image} alt="" className="w-150 rounded-lg" />
                </div>

                <div className="flex flex-col justify-start w-2/4 py-5 px-2 gap-1 basis-128">
                    <h1 className="text-4xl font-semibold ">{productById.model}</h1>
                    <h1 className="text-lg text-gray-500">{productById.color}  •  {productById.capacity}</h1>
                    {productById.hasDiscount
                        ? (
                            <div className="flex gap-5 items-end pt-3 pb-3">
                                <h1 className="text-4xl font-semibold">${formatNumber(priceWhitDiscount(productById.price, productById.discount))}</h1>
                                <h1 className="flex line-through text-lg text-gray-500">${formatNumber(productById.price)}</h1>
                            </div>
                        )
                        : (
                            <div className="flex pt-3 pb-3">
                                <h1 className="text-4xl font-semibold">${formatNumber(productById.price)}</h1>
                            </div>
                        )
                    }
                    <div className="flex border-t pb-4"></div>

                    <div className="flex grid grid-cols-2 grid-rows-2 gap-5">
                        <div className="border rounded-lg ">1</div>
                        <div className="border rounded-lg p-5 ">2</div>
                        <div className="border rounded-lg p-5 ">3</div>
                        <div className="border rounded-lg p-5 ">4</div>
                    </div>
                </div>
            </div>
        </div>
    )
}