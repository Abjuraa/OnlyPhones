function Slider({ content }) {
    return (
        <div className="hover:scale-101 transition duration-300 ease-in-out">
            <div className="relative top-0">
                <img className="rounded-4xl object-cover w-[374px] h-[660px]" src={content.image} alt="" />
                <div className="absolute top-2 left-2 p-5 gap-2">
                    <h5 className="text-base text-gray-300 font-bold">{content.titulo}</h5>
                    <h4 className="text-2xl text-gray-100 font-bold max-w-[250px]">{content.subtitulo}</h4>
                </div>
            </div>
        </div>
    )
}

export default Slider