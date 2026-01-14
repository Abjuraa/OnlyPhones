export default function CardInfoProduct({ Icon, title, desc, iconColor }) {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 p-5 rounded-xl">
            <div className="rounded-full bg-white p-4">
                <Icon color={iconColor} />
            </div>
            <div className="flex flex-col justify-center items-center pt-5 gap-2">
                <h1 className="font-bold text-xl">{title}</h1>
                <h1 className="text-slate-400 text-center text-sm">{desc}</h1>
            </div>
        </div>
    )
}