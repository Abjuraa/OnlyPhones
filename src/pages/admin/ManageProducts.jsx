import { useEffect, useState, useReducer } from "react";
import { useProducts } from "../../hooks/useProduct"
import { ArrowLeftIcon, ArrowRightIcon } from "../../assets/icons/Arrows";
import Swal from "sweetalert2";
import { icons } from "../../assets/icons";
import CAPACITIES from "@/const/capacities";
import GRADE from "@/const/grades";
import SelectForm from "@/components/SelectForm";
import InputForm from "@/components/InputForm";

export default function ManageProducts() {

    const [page, setPage] = useState(0);
    const DEFAULT_SIZE = 10;
    const { getAllProducts, createProductHook, productsPaginador, productsPerPage, products, deleteProduct, setProductsPerPage, editProduct, editProductImageHook, loading } = useProducts();
    const [edit, setEdit] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [createFile, setCreateFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [openModalCreate, setOpenModalCreate] = useState(false);

    useEffect(() => {
        getAllProducts();
    }, [])

    console.log(products)
    const createProduct = {
        model: "",
        color: "",
        grade: "",
        price: 0,
        discount: 0,
        camera: "",
        processor: "",
        history: "",
        capacity: "",
        physicalState: "",
        security: "",
        image: null,
        screen: "",
        unitsAvailable: 0,
        batteryPercentage: 0,
        warranty: 0,
        hasAvailable: false,
        hasDiscount: false
    };

    function reducer(state, action) {
        return {
            ...state,
            [action.name]: action.value
        }
    }

    const [product, dispatch] = useReducer(reducer, createProduct);


    const formatNumber = (price) => {
        return new Intl.NumberFormat("es-CO").format(price);
    }

    useEffect(() => {
        productsPaginador(page, DEFAULT_SIZE);
    }, [page])

    const handleCreateProduct = async () => {
        const formData = new FormData();

        formData.append("product", JSON.stringify(product));
        formData.append("image", createFile);
        await createProductHook(formData)
        setOpenModalCreate(false);
        window.location.reload();
    }

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
        setImagePreview(data.image);
        setImageFile(null);
    }

    const handleUpdateProduct = async () => {
        try {
            await editProduct(productToEdit.idProduct, productToEdit);

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                await editProductImageHook(productToEdit.idProduct, formData);
            }
            setEdit(false);
            window.location.reload();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    const labelDefault = ({ text, size = "xs" }) => {
        return (
            <label className={`text-${size} font-semibold`}>{text}</label>
        )
    }

    return (
        <div className="flex flex-row">
            <div className="flex flex-col justify-start items-start w-screen px-20 py-15">
                <div className="flex flex-row w-full justify-between itmems-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-5xl ">Inventario de productos</h1>
                        <p className="text-slate-400 text-sm">Gestión centralizada de stock de iPhones y productos de Apple.</p>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                        <button
                            type="button"
                            className="bg-blue-500 p-2 rounded-lg text-white text-sm hover:bg-blue-400 duration-300 ease-in-out"
                            onClick={() => setOpenModalCreate(true)}
                        >+ Agregar producto
                        </button>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-center items-center mt-4 py-5">
                    <table className="w-full border border-gray-300 shadow-md">
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
                                            className="w-16 h-16 object-contain rounded"
                                        />
                                    </td>
                                    <td className="p-3 px-5 flex flex-col items-start text-lg font-semibold">
                                        {product.model}
                                        <br />
                                        <span className="text-sm text-slate-500 font-normal">{product.color}</span>
                                    </td>
                                    <td className="p-3 text-slate-600">{product.capacity >= 1024 ? product.capacity / 1024 + "TB" : product.capacity + "GB"}</td>
                                    <td className={`${product.batteryPercentage >= 95 ? "text-green-700 font-semibold" : product.batteryPercentage > 81 ? "text-yellow-600 font-semibold" : product.batteryPercentage <= 80 && "text-red-600 font-semibold"}`}>
                                        <span className={`${product.batteryPercentage >= 95 ? "p-1 px-2 bg-green-100 rounded-lg" : product.batteryPercentage > 81 ? "p-1 px-2 bg-yellow-100 rounded-lg" : product.batteryPercentage <= 80 && "p-1 px-2 rounded-lg bg-red-100"}`}>{product.batteryPercentage}%</span>
                                    </td>
                                    <td className="p-3 font-semibold">${formatNumber(product.price)}</td>
                                    <td className="p-3">
                                        {product.hasAvailable === true
                                            ? <span className="p-1 px-2 bg-green-100 rounded-lg text-green-700 font-semibold">Disponible</span>
                                            : <span className="p-1 px-2 bg-red-100 rounded-lg text-red-700 font-semibold">No disponible</span>
                                        }
                                    </td>
                                    <td className="py-7 flex gap-5 justify-center">
                                        <button className="">
                                            <a href={`/privada/producto/${product.idProduct}`}><icons.EyeOpenBaseline color={"oklch(70.4% 0.04 256.788)"} size={20} /></a>
                                        </button>
                                        <button className="cursor-pointer"
                                            onClick={() => handleEditProduct(product)}
                                        >
                                            {icons.Edit(20, "oklch(70.4% 0.04 256.788)")}
                                        </button>
                                        <button
                                            className="cursor-pointer"
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
                <div className="flex flex-row w-full justify-center items-center mt-4 px-1 py-1">
                    <div className="flex flex-row justify-between items-center w-full">
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

                { /* MODAL CREAR PRODUCTO */}
                {openModalCreate == true ?
                    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs bg-black/20 py-10">
                        <div className="bg-white w-2/3 h-full max-h-[90vh] rounded-lg mx-5 flex flex-col">
                            <div className="p-4">
                                <h1 className="font-bold text-xl">Crear producto</h1>
                                <p className="text-xs text-slate-500">
                                    Llena los campos necesarios para crear un nuevo producto.
                                </p>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4">
                                <h1 className="text-sm font-semibold pb-2 border-b mb-3">
                                    Detalles del producto
                                </h1>

                                { /* LADO IZQUIERDO*/}
                                <div className="grid grid-cols-2 gap-2 pt-4">
                                    <div className="flex flex-col pe-10 gap-2">
                                        {labelDefault({ text: "Modelo" })}
                                        <InputForm
                                            type="text"
                                            name="model"
                                            value={product.model}
                                            onChange={e =>
                                                dispatch({ name: e.target.name, value: e.target.value })
                                            }
                                        />
                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            {labelDefault({ text: "Color" })}
                                            {labelDefault({ text: "Grado" })}

                                            <InputForm
                                                type={"text"}
                                                name={"color"}
                                                value={product.color}
                                                onChange={e =>
                                                    dispatch({ name: e.target.name, value: e.target.value })
                                                }
                                            />

                                            <SelectForm
                                                placeholder={"selecciona un producto"}
                                                options={GRADE}
                                                value={product.grade}
                                                name={"grade"}
                                                onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                            />


                                            {labelDefault({ text: "Precio" })}
                                            {labelDefault({ text: "Descuento (%)" })}

                                            <InputForm
                                                type="number"
                                                name="price"
                                                value={product.price}
                                                onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                            />

                                            <InputForm
                                                type={"number"}
                                                name="discount"
                                                value={product.discount}
                                                onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                            />
                                        </div>
                                        {labelDefault({ text: "Cámara" })}
                                        <InputForm
                                            type="text"
                                            name="camera"
                                            value={product.camera}
                                            onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                        />

                                        {labelDefault({ text: "Procesador" })}
                                        <InputForm
                                            type="text"
                                            name="processor"
                                            value={product.processor}
                                            onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                        />

                                        {labelDefault({ text: "Historial del dispositivo" })}

                                        <textarea
                                            className="border border-slate-400 p-2 rounded-lg text-sm h-24"
                                            name="history"
                                            value={product.history}
                                            onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                        />

                                        {labelDefault({ text: "Estado fisico del producto" })}
                                        <textarea
                                            className="border border-slate-400 p-2 rounded-lg text-sm h-24"
                                            name="physicalState"
                                            value={product.physicalState}
                                            onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                        />

                                        {labelDefault({ text: "Tipo de seguridad" })}

                                        <textarea
                                            className="border border-slate-400 p-2 rounded-lg text-sm h-24"
                                            name="security"
                                            value={product.security}
                                            onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                        />
                                    </div>

                                    { /* LADO DERECHO*/}
                                    <div className="flex flex-col pe-10 gap-2">
                                        {labelDefault({ text: "Imagen del producto" })}

                                        <div className="flex flex-col items-center gap-4">
                                            <img src={imagePreview} className="w-xs" alt="" />
                                            <input
                                                className="text-xs text-slate-500 cursor-pointer"
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setCreateFile(file);
                                                    setImagePreview(URL.createObjectURL(file));
                                                }} />
                                        </div>

                                        {labelDefault({ text: "Pantalla" })}
                                        <InputForm
                                            type={"text"}
                                            name={"screen"}
                                            value={product.screen}
                                            onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                        />

                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            {labelDefault({ text: "Capacidad" })}
                                            {labelDefault({ text: "Unidades disponibles" })}
                                            <SelectForm
                                                placeholder={"selecciona un producto"}
                                                options={CAPACITIES}
                                                name={"capacity"}
                                                value={product.capacity}
                                                onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                            />

                                            <InputForm
                                                type={"number"}
                                                name={"unitsAvailable"}
                                                value={product.unitsAvailable}
                                                onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                            />

                                            {labelDefault({ text: "Estado de bateria" })}
                                            {labelDefault({ text: "Garantia (Dias)" })}

                                            <InputForm
                                                type={"number"}
                                                name={"batteryPercentage"}
                                                value={product.batteryPercentage}
                                                onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                            />
                                            <InputForm
                                                type={"number"}
                                                name={"warranty"}
                                                value={product.warranty}
                                                onChange={e => dispatch({ name: e.target.name, value: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2 items-center justify-items-around">
                                            <div className="flex flex-col">
                                                {labelDefault({ text: "Disponible", size: "sm" })}
                                                <span className="text-xs text-slate-500">Visible en la tienda online</span>
                                            </div>

                                            <input
                                                className="border border-slate-400 p-2 rounded-lg text-sm h-5"
                                                type="checkbox"
                                                name="hasAvailable"
                                                checked={product.hasAvailable}
                                                onChange={e => dispatch({ name: e.target.name, value: e.target.checked })}
                                            />

                                            <div className="flex flex-col">
                                                {labelDefault({ text: "Aplicar descuento", size: "sm" })}
                                                <span className="text-xs text-slate-500">Aplicar precio de oferta</span>
                                            </div>

                                            <input
                                                className="border border-slate-400 p-2 rounded-lg text-sm h-5"
                                                type="checkbox"
                                                name="hasDiscount"
                                                checked={product.hasDiscount}
                                                onChange={e => dispatch({ name: e.target.name, value: e.target.checked })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t flex justify-end gap-2 bg-white">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                                        onClick={() => setOpenModalCreate(false)}
                                    >
                                        Cancelar
                                    </button>

                                    {loading === true
                                        ? <button
                                            type="button"
                                            disabled={loading === true}
                                            className="px-4 py-2 bg-blue-800 text-white rounded cursor-not-allowed"
                                        >
                                            Guardando
                                        </button>
                                        : <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                                            onClick={handleCreateProduct}
                                        >
                                            Guardar
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
                }

                {edit == true ?
                    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs bg-black/20 py-10">
                        <div className="bg-white w-2/3 h-full max-h-[90vh] rounded-lg mx-5 flex flex-col">

                            <div className="p-4">
                                <h1 className="font-bold text-xl">Editar Producto</h1>
                                <p className="text-xs text-slate-500">
                                    Actualiza las especificaciones y precio del producto.
                                </p>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4">
                                <h1 className="text-sm font-semibold pb-2 border-b mb-3">
                                    Detalles del producto
                                </h1>

                                { /* LADO IZQUIERDO*/}
                                <div className="grid grid-cols-2 gap-2 pt-4">
                                    <div className="flex flex-col pe-10 gap-2">
                                        {labelDefault({ text: "Modelo" })}
                                        <InputForm
                                            type="text"
                                            value={productToEdit.model}
                                            onChange={(e) => setProductToEdit({ ...productToEdit, model: e.target.value })}
                                        />
                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            {labelDefault({ text: "Color" })}
                                            {labelDefault({ text: "Grado" })}

                                            <InputForm
                                                type={"text"}
                                                value={productToEdit.color}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, color: e.target.value })}
                                            />

                                            <SelectForm
                                                placeholder={"selecciona un producto"}
                                                options={GRADE}
                                                value={productToEdit.grade}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, grade: e.target.value })}
                                            />

                                            {labelDefault({ text: "Precio" })}
                                            {labelDefault({ text: "Descuento (%)" })}

                                            <InputForm
                                                type="number"
                                                value={productToEdit.price}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })}
                                            />

                                            <InputForm
                                                type={"number"}
                                                value={productToEdit.discount}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, discount: e.target.value })}
                                            />
                                        </div>
                                        {labelDefault({ text: "Cámara" })}
                                        <InputForm
                                            type="text"
                                            value={productToEdit.camera}
                                            onChange={(e) => setProductToEdit({ ...productToEdit, camera: e.target.value })}
                                        />

                                        {labelDefault({ text: "Procesador" })}
                                        <InputForm
                                            type="text"
                                            value={productToEdit.processor}
                                            onChange={(e) => setProductToEdit({ ...productToEdit, processor: e.target.value })}
                                        />

                                        {labelDefault({ text: "Historial del dispositivo" })}

                                        <textarea
                                            className="border border-slate-400 p-2 rounded-lg text-sm h-24"
                                            value={productToEdit.history}
                                            onChange={(e) => setProductToEdit({ ...productToEdit, history: e.target.value })}
                                        />

                                        {labelDefault({ text: "Estado fisico del producto" })}
                                        <textarea
                                            className="border border-slate-400 p-2 rounded-lg text-sm h-24"
                                            value={productToEdit.physicalState}
                                            onChange={(e) => setProductToEdit({ ...productToEdit, physicalState: e.target.value })}
                                        />

                                        {labelDefault({ text: "Tipo de seguridad" })}

                                        <textarea
                                            className="border border-slate-400 p-2 rounded-lg text-sm h-24"
                                            value={productToEdit.security}
                                            onChange={(e) => setProductToEdit({ ...productToEdit, security: e.target.value })}
                                        />
                                    </div>

                                    { /* LADO DERECHO*/}
                                    <div className="flex flex-col pe-10 gap-2">
                                        {labelDefault({ text: "Imagen del producto" })}

                                        <div className="flex flex-col items-center gap-4">
                                            <img src={imagePreview} className="w-xs" alt="" />
                                            <input
                                                className="text-xs text-slate-500 cursor-pointer"
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setImageFile(file);
                                                    setImagePreview(URL.createObjectURL(file));
                                                }} />
                                        </div>

                                        {labelDefault({ text: "Pantalla" })}
                                        <InputForm
                                            type={"text"}
                                            value={productToEdit.screen}
                                            onChange={(e) => setProductToEdit({ ...productToEdit, screen: e.target.value })}
                                        />

                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            {labelDefault({ text: "Capacidad" })}
                                            {labelDefault({ text: "Unidades disponibles" })}

                                            <SelectForm
                                                placeholder={"selecciona un producto"}
                                                options={CAPACITIES}
                                                value={productToEdit.capacity}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, capacity: e.target.value })}
                                            />

                                            <InputForm
                                                type={"number"}
                                                value={productToEdit.unitsAvailable}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, unitsAvailable: e.target.value })}
                                            />

                                            {labelDefault({ text: "Estado de bateria" })}
                                            {labelDefault({ text: "Garantia (Dias)" })}

                                            <InputForm
                                                type={"number"}
                                                value={productToEdit.batteryPercentage}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, batteryPercentage: e.target.value })}
                                            />
                                            <InputForm
                                                type={"number"}
                                                value={productToEdit.warranty}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, warranty: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2 items-center justify-items-around">
                                            <div className="flex flex-col">
                                                {labelDefault({ text: "Disponible", size: "sm" })}
                                                <span className="text-xs text-slate-500">Visible en la tienda online</span>
                                            </div>

                                            <input
                                                className="border border-slate-400 p-2 rounded-lg text-sm h-5"
                                                type="checkbox"
                                                checked={productToEdit.hasAvailable}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, hasAvailable: e.target.checked })}
                                            />

                                            <div className="flex flex-col">
                                                {labelDefault({ text: "Aplicar descuento", size: "sm" })}
                                                <span className="text-xs text-slate-500">Aplicar precio de oferta</span>
                                            </div>

                                            <input
                                                className="border border-slate-400 p-2 rounded-lg text-sm h-5"
                                                type="checkbox"
                                                checked={productToEdit.hasDiscount}
                                                onChange={(e) => setProductToEdit({ ...productToEdit, hasDiscount: e.target.checked })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t flex justify-end gap-2 bg-white">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancelar
                                    </button>

                                    {loading === true
                                        ? <button
                                            type="button"
                                            disabled={loading === true}
                                            className="px-4 py-2 bg-blue-800 text-white rounded cursor-not-allowed"
                                        >
                                            Guardando
                                        </button>
                                        : <button
                                            type="button"
                                            onClick={handleUpdateProduct}
                                            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
                                        >
                                            Guardar
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </div >
    )
}