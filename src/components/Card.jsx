
function Card({ product }) {

    const formatNumber = (product) => {
        return new Intl.NumberFormat("es-CO").format(product)
    }

    const priceWithDiscount = (product) => {
        return product.price - (product.price * (product.discount / 100))
    }

    return (
        <div className="flex flex-col transition-shadow bg-white max-w-[220px] min-h-[300px] hover:scale-101 duration-300 ease-in-out rounded-2xl ">
            <div className="relative flex items-center justify-center h-48 w-full overflow-hidden rounded-t-2xl">
                <img
                    src={product.image}
                    alt={product.model}
                    className="object-contain w-full h-full p-2 transition-transform duration-300 hover:scale-105"
                />

                {product.discount > 0 ? <div className="absolute top-3 right-3 bg-black/80 text-white text-[11px] font-semibold px-2 py-1 rounded-full tracking-wide">
                    {product.discount}% DTO
                </div> : null}

            </div>

            <div className="flex flex-col items-center justify-center px-3 py-4">
                <h1 className="text-sm font-semibold text-gray-900 ">{product.model}</h1>
                {product.discount <= 0
                    ? <p className="text-lg font-bold text-gray-900 mt-1">Desde ${formatNumber(product.price)}</p>
                    : (<>
                        <p className="text-lg font-bold text-gray-900 mt-1">Desde ${formatNumber(priceWithDiscount(product))}</p>
                        <p className="text-xs text-gray-500 line-through mt-1">Antes ${formatNumber(product.price)}</p>
                    </>
                    )
                }

            </div>
        </div>
    )
}

export default Card