import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProduct"
import { ArrowLeftIcon, ArrowRightIcon } from "../../assets/icons/Arrows";

export default function ManageProducts() {

    const [page, setPage] = useState(0);
    const DEFAULT_SIZE = 10;
    const { productsPaginador, productsPerPage } = useProducts();

    const formatNumber = (price) => {
        return new Intl.NumberFormat("es-CO").format(price);
    }

    console.log("productos por pagina", productsPerPage)

    useEffect(() => {
        productsPaginador(page, DEFAULT_SIZE);
    }, [page])

    return (
        <div className="flex flex-row">
            <div className="flex flex-col justify-start items-start w-screen px-4 py-4">
                <h1 className="font-bold text-4xl ">Inventario de productos</h1>
                <div className="w-full flex flex-col justify-center items-center mt-4 px-4 py-5">
                    <table className="w-full max-w-6xl border border-gray-300 shadow-md">
                        <thead className="">
                            <tr className="text-center">
                                <th className="p-3 text-sm text-slate-400 font-semibold">IMAGEN</th>
                                <th className="p-3 text-sm text-slate-400 font-semibold">MODELO</th>
                                <th className="p-3 text-sm text-slate-400 font-semibold">CAPACIDAD</th>
                                <th className="p-3 text-sm text-slate-400 font-semibold">SALUD</th>
                                <th className="p-3 text-sm text-slate-400 font-semibold">PRECIO</th>
                                <th className="p-3 text-sm text-slate-400 font-semibold">ESTADO</th>
                                <th className="p-3 text-sm text-slate-400 font-semibold">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsPerPage?.content?.map((product) => (
                                <tr key={product.id} className="border-t hover:bg-gray-50 text-center w-full">
                                    <td className="p-3 justify-items-center">
                                        <img
                                            src={product.image}
                                            alt={product.model}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-3 flex flex-col items-start text-lg font-semibold">{product.model} <br />
                                        <span className="text-sm text-slate-500 font-normal">{product.color}</span>
                                    </td>
                                    <td className="p-3 text-slate-600">{product.capacity}</td>
                                    <td className={`${product.batteryPercentage >= 95 ? "text-green-700 font-semibold" : product.batteryPercentage > 81 ? "text-yellow-600 font-semibold" : product.batteryPercentage <= 80 && "text-red-600 font-semibold"}`}>
                                        <span className={`${product.batteryPercentage >= 95 ? "p-1 px-2 bg-green-100 rounded-lg" : product.batteryPercentage > 81 ? "p-1 px-2 bg-yellow-100 rounded-lg" : product.batteryPercentage <= 80 && "p-1 px-2 rounded-lg bg-red-100"}`}>{product.batteryPercentage}%</span>
                                    </td>
                                    <td className="p-3 font-semibold">${formatNumber(product.price)}</td>
                                    <td className="p-3">
                                        {product.unitsAvailable >= 1 ? "Disponible" : "No disponible"}
                                    </td>
                                    <td className="py-7 flex gap-2 justify-center">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                            Editar
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-row w-full justify-center items-center mt-4 px-4 py-3">
                    <div className="flex flex-row justify-between items-center w-full max-w-6xl px-4">
                        <p className="text-xs text-slate-500 font-semibold">Mostrando {productsPerPage?.content?.length} de {productsPerPage?.totalItems} productos</p>

                        <div className="flex gap-4 justify-center items-center">
                            <button
                                disabled={page === 0}
                                onClick={() => setPage(page - 1)}
                                className="border rounded-lg p-2"
                            >
                                <ArrowLeftIcon />
                            </button>
                            <span className="text-slate-600 font-semibold">{page + 1}</span>
                            <button
                                disabled={page + 1 >= productsPerPage?.totalPages}
                                onClick={() => setPage(page + 1)}
                                className="border rounded-lg p-2"
                            >
                                <ArrowRightIcon/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}