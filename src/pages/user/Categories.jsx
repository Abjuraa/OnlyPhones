import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import Card from "../../components/Card"
import { useProducts } from "../../hooks/useProduct"
import { useNavigate } from "react-router-dom"
import { icons } from "../../assets/icons"


function Categories() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const { getAllProducts, products, loading } = useProducts();
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, [])



    const filteredProducts = products?.filter((product) => {
        const matchSearch =
            product.model.toLowerCase().includes(search.toLowerCase()) ||
            product.price.toString().includes(search) ||
            product.color.toLowerCase().includes(search.toLowerCase());
        return matchSearch;
    });

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts?.slice(indexOfFirst, indexOfLast);


    const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row px-5 pt-5 md:ps-10 md:pt-10 justify-center md:justify-end w-full md:pe-20">
                <Sidebar
                    search={search}
                    setSearch={setSearch}
                    placeholder="Busca tu nuevo iPhone ..."
                />
            </div>

            <div className="flex flex-col w-full">
                <div className="flex flex-row flex-wrap justify-around items-center gap-4 md:gap-10 p-4 md:p-10 w-full">
                    {loading
                        ? <div className="flex justify-center items-center text-slate-500 py-40 md:py-20">
                            <icons.Loader />
                        </div>
                        : currentProducts?.length === 0 ?

                            <div className="flex flex-col justify-center items-center py-20">
                                <p className="text-center text-4xl font-bold text-gray-400">No se encontraron productos, vuelve más tarde</p>
                            </div>
                            :
                            currentProducts?.map((product) => (
                                <div
                                    key={product.idProduct}
                                    onClick={() => navigate(`/privada/producto/${product.idProduct}`)}
                                    className="hover:scale-102 transition duration-300 ease-in-out"
                                >
                                    <Card product={product} />
                                </div>
                            )
                            )}
                </div>

                <div className="flex justify-center items-center gap-2 py-6 w-full">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-lg border transition ${currentPage === i + 1
                                ? "bg-black text-white border-black"
                                : "bg-white text-black border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;
