function Sidebar({ search, setSearch, placeholder }) {

    return (
        <div className="flex flex-col w-full md:w-auto">
            <div className="w-full">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={placeholder}
                    className="w-full md:w-72 border border-gray-300 rounded-full text-sm px-5 py-3 md:py-2 bg-white text-gray-400 focus:outline-none focus:text-gray-500" />
            </div>
        </div>
    )
}

export default Sidebar