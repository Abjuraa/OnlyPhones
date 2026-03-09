
function Card({ product }) {

    const formatNumber = (product) => {
        return new Intl.NumberFormat("es-CO").format(product)
    }

    const priceWithDiscount = (product) => {
        return product.price - (product.price * (product.discount / 100))
    }

    return (
        <div className="flex flex-col transition-shadow bg-white w-[160px] sm:w-[220px] min-h-[250px] sm:min-h-[300px] hover:scale-101 duration-300 ease-in-out rounded-2xl shadow-sm sm:shadow-none border border-gray-100 sm:border-transparent">
            <div className="relative flex items-center justify-center h-40 sm:h-48 w-full overflow-hidden rounded-t-2xl">
                <img
                    src={product.image}
                    alt={product.model}
                    className="object-contain w-full h-full p-2 transition-transform duration-300 hover:scale-105"
                />

                {product.hasDiscount === true ? <div className="absolute top-3 right-3 bg-black/80 text-white text-[11px] font-semibold px-2 py-1 rounded-full tracking-wide">
                    {product.discount}% DTO
                </div> : null}

            </div>

            <div className="flex flex-col items-center justify-center px-1 sm:px-3 py-3 sm:py-4">
                <h1 className="flex text-center text-xs sm:text-sm font-semibold text-gray-900 w-full justify-center px-1">{product.model}</h1>
                {product.hasDiscount === false
                    ? <p className="text-sm sm:text-lg font-bold text-gray-900 mt-1 text-center">Desde ${formatNumber(product.price)}</p>
                    : (<>
                        <p className="text-sm sm:text-lg font-bold text-gray-900 mt-1 text-center">Desde ${formatNumber(priceWithDiscount(product))}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 line-through mt-0.5 sm:mt-1 text-center">Antes ${formatNumber(product.price)}</p>
                    </>
                    )
                }
            </div>
        </div>
    )
}

export default Card