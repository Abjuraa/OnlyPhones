import { Link } from 'react-router-dom'

function CardInfo({ content }) {
    return (
        <div className="relative w-[572px] h-[532px] overflow-hidden rounded-4xl hover:scale-101 transition duration-300 ease-in-out">
            <img
                className="w-full h-full object-cover"
                src={content.image}
                alt="Airpods"
            />

            <div className="absolute inset-0 bg-black/20"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                <h1 className="text-3xl font-bold pb-5 text-slate-200">{content.title}</h1>
                <p className="text-sm max-w-xs pb-5">{content.description}</p>
                <button className="mt-2 px-4 py-2 bg-blue-400 text-black rounded-full text-sm font-medium hover:bg-gray-200 transition">
                    <p className="text-white hover:text-black"><Link to={content.link}>Más información</Link></p>
                </button>
            </div>
        </div>
    )
}

export default CardInfo
