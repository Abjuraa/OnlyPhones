import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Card from "../components/Card"
import products from "../Const_tmp/products"

function Categories() {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const filteredProducts = products.filter((products) => {
        const matchSearch =
            products.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            products.valor.toString().includes(search);

        const matchCategories =
            selectedCategories.length === 0 ||
            selectedCategories.some(
                (category) =>
                    (products.color || "").includes(category) ||
                    (products.categoria || "").includes(category)
            );

        return matchSearch && matchCategories;
    });

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-col ps-10 py-10">
                <Sidebar
                    search={search}
                    setSearch={setSearch}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex flex-row flex-wrap gap-10 py-10 px-5">
                    {currentProducts.length === 0 ?
                        (
                            <div className=" flex-1 flex justify-center items-center">
                                <p className="text-center text-4xl font-bold text-gray-400">No se encontraron productos para esta categoria</p>
                            </div>
                        ) : (
                            currentProducts.map((product) => (
                                <div
                                    key={product.id}
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
