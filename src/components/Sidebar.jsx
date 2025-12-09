function Sidebar({ search, setSearch }) {

    return (
        <div className="flex flex-col pe-20">
            <div className="">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Busca tu nuevo iPhone ..."
                    className="border border-gray-300 rounded-full text-sm px-5 py-2 bg-white text-gray-400 focus:outline-none focus:text-gray-500" />
            </div>
        </div>
    )
}

export default Sidebar