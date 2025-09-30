function Sidebar({ search, setSearch, selectedCategories, setSelectedCategories }) {

    const info = [
        {
            id: 1,
            title: "Modelo del celular",
            options: [
                "iPhone 11",
                "iPhone 12",
                "iPhone 13",
                "iPhone 14",
                "iPhone 15",
                "iPhone 16",
                "iPhone 17",
            ]
        },
        {
            id: 2,
            title: "Color del celular",
            options: [
                "Negro",
                "Blanco",
                "Dorado"
            ]
        },
    ]

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category))
        } else {
            setSelectedCategories([...selectedCategories, category])
        }
    }


    return (
        <div className="flex flex-col px-5 py-5 rounded-2xl bg-slate-200 gap-2 border border-gray-300">
            <h1 className="text-2xl font-bold">Filtros</h1>
            <div className="">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar"
                    className="border border-gray-300 rounded-full text-sm px-2 py-1 bg-white text-gray-400 focus:outline-none focus:text-gray-500" />
            </div>

            <div className="">
                {info.map((content) => (
                    <ul key={content.id}>
                        <h1 className="text-base pb-1">{content.title}</h1>
                        {content.options.map((options) => (
                            <li key={options} className="text-sm text-gray-600 ps-4 pb-1">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(options)}
                                    onChange={() => toggleCategory(options)}
                                />
                                {options}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default Sidebar