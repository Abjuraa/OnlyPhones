
function Card({ product }) {

    const formatNumber = (product) => {
        return new Intl.NumberFormat("es-CO").format(product)
    }

    return (
        <div className="flex flex-col border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white max-w-[220px]">
            <div className="relative">
                <img
                    className="px-3 py-2"
                    src={product.img}
                    alt=""
                />

                {product.descuento > 0 ? <div className="absolute top-3 right-3 bg-black/80 text-white text-[11px] font-semibold px-2 py-1 rounded-full tracking-wide">
                    {product.descuento}% DTO
                </div> : null}

            </div>

            <div className="flex flex-col items-center px-3 py-4">
                <h1 className="text-sm font-semibold text-gray-900">{product.nombre}</h1>
                <p className="text-lg font-bold text-gray-900 mt-1">Desde ${formatNumber(product.valor)}</p>
                <p className="text-xs text-gray-500 line-through mt-1">Antes ${formatNumber(product.antes)}</p>
            </div>
        </div>
    )
}

export default Card