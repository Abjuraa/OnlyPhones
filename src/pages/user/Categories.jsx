import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import Card from "../../components/Card"
import { useProducts } from "../../hooks/useProduct"
import { useNavigate } from "react-router-dom"

function Categories() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const { getAllProducts, products } = useProducts();
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, [])



    const filteredProducts = products.filter((products) => {
        const matchSearch =
            products.model.toLowerCase().includes(search.toLowerCase()) ||
            products.price.toString().includes(search) ||
            products.color.toLowerCase().includes(search.toLowerCase());
        return matchSearch;
    });

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row ps-10 pt-10 justify-end">
                <Sidebar
                    search={search}
                    setSearch={setSearch}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex flex-row gap-10 py-2 px-5 justify-center items-center">
                    {currentProducts.length === 0 ?
                        (
                            <div className="flex flex-col justify-center items-center py-20">
                                <p className="text-center text-4xl font-bold text-gray-400">No se encontraron productos, vuelve a intentarlo</p>
                            </div>
                        ) : (
                            currentProducts.map((product) => (
                                <div
                                    key={product.idProduct}
                                    onClick={() => navigate(`/privada/producto/${product.idProduct}`)}
                                    className="hover:scale-102 transition duration-300 ease-in-out"
                                >
                                    <Card product={product} />
                                </div>
                            ))
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
