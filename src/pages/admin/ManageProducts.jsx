import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProduct"
import { ArrowLeftIcon, ArrowRightIcon } from "../../assets/icons/Arrows";
import Swal from "sweetalert2";
import { icons } from "../../assets/icons";

export default function ManageProducts() {

    const [page, setPage] = useState(0);
    const DEFAULT_SIZE = 10;
    const { productsPaginador, productsPerPage, deleteProduct, setProductsPerPage, editProduct } = useProducts();
    const [edit, setEdit] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const formatNumber = (price) => {
        return new Intl.NumberFormat("es-CO").format(price);
    }

    useEffect(() => {
        productsPaginador(page, DEFAULT_SIZE);
    }, [page])

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "El producto sera eliminado permanentemente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
                setProductsPerPage(prevState => ({
                    ...prevState,
                    content: prevState.content.filter(product => product.idProduct !== id)
                }));
                Swal.fire({
                    title: "Producto eliminado!",
                    text: "El producto ha sido eliminado correctamente.",
                    icon: "success",
                });
            }
        });
    }


    const handleEditProduct = (data) => {
        setEdit(true);
        setProductToEdit({ ...data });
    }

    const handleUpdateProduct = async () => {
        try {
            editProduct(productToEdit.idProduct, productToEdit);
            setEdit(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }
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
                                <tr key={product.idProduct} className="border-t hover:bg-gray-50 text-center w-full">
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
                                    <td className="py-7 flex gap-5 justify-center">
                                        <button className=""
                                            onClick={() => handleEditProduct(product)}
                                        >
                                            {icons.Edit(20, "oklch(70.4% 0.04 256.788)")}
                                        </button>
                                        <button
                                            className=""
                                            onClick={() => handleDeleteProduct(product.idProduct)}
                                        >
                                            {icons.Trash(20, "oklch(70.4% 0.04 256.788)")}
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
                                <ArrowRightIcon />
                            </button>
                        </div>
                    </div>
                </div>

                {edit == true ?
                    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs bg-black/20 py-10">
                        <div className="bg-white w-2/5 h-full max-h-[90vh] rounded-lg mx-5 flex flex-col">

                            {/* HEADER */}
                            <div className="p-4 border-b">
                                <h1 className="font-bold text-xl">Editar Producto</h1>
                                <p className="text-xs text-slate-500">
                                    Actualiza las especificaciones y precio del producto.
                                </p>
                            </div>

                            {/* BODY SCROLL */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <h1 className="text-sm font-semibold pb-2 border-b mb-3">
                                    Detalles del producto
                                </h1>

                                <div className="flex flex-col gap-2 pt-4">
                                    <label className="text-xs font-semibold">Modelo</label>
                                    <input type="text"
                                        className="border border-slate-400 p-2 rounded-lg"
                                        value={productToEdit.model}
                                        onChange={(e) => setProductToEdit({ ...productToEdit, model: e.target.value })}
                                    />

                                    <label className="text-xs font-semibold">Modelo</label>
                                    <input type="text"
                                        value={productToEdit.batteryPercentage}
                                        onChange={(e) => setProductToEdit({ ...productToEdit, batteryPercentage: e.target.value })}
                                    />
                                </div>

                                {/* FOOTER FIJO */}
                                <div className="p-4 border-t flex justify-end gap-2 bg-white">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-300 rounded"
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleUpdateProduct}
                                        className="px-4 py-2 bg-blue-600 text-white rounded"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    : null}
            </div>
        </div>
    )
}