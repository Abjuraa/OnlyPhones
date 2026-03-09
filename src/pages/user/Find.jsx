import { MyMap } from "../../components/Map"
import { icons } from "../../assets/icons"

function Find() {
    return (
        <div className="flex flex-col h-full w-full py-10 md:px-40 px-10">
            <div className="flex flex-col gap-2">
                <h1 className="font-sans font-bold md:text-5xl text-3xl">Nuestra Tienda</h1>
                <p className="text-zinc-500 max-w-2xl">Visitanos para conocer lo ultimo en tecnologia y recibir asesoria personalizada de nuestro equipo</p>
            </div>

            <div className="flex flex-col md:flex-row pt-8 justify-center gap-8 md:gap-0 w-full mb-10">
                <div className="flex flex-col w-full md:w-[350px] flex-shrink-0">
                    <div className="flex flex-col border rounded-2xl border-slate-200 md:h-full p-2 hover:shadow-md transition duration-300 ease-in-out">
                        <div className="flex pt-3 px-3">
                            <icons.Tienda />
                        </div>
                        <div className="flex flex-col h-full justify-between pb-2">
                            <div>
                                <h1 className="font-semibold text-xl mt-3 px-3 pb-2">Centro Comercial Punto 13</h1>
                                <div className="flex flex-col px-3 gap-1.5">
                                    <p className="text-slate-500 text-sm font-medium">Calle 13 # 15-27, Bogotá</p>
                                    <p className="text-sm">Lun - Sab: <span className="text-slate-500 font-medium">10AM - 8PM</span></p>
                                    <p className="text-sm">Dom: <span className="text-slate-500 font-medium">10AM - 4PM</span></p>
                                </div>
                            </div>
                            <div className="">
                                <h1 className="font-semibold text-xl mt-3 px-3 pb-2">Proximamente más puntos.</h1>
                            </div>
                            <div className="flex w-full pt-6 px-3">
                                <button
                                    type="button"
                                    className="flex bg-slate-200 text-black w-full justify-center items-center gap-2 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 hover:scale-102 transition duration-300 ease-in-out">
                                    <icons.IconLocation /> Cómo llegar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex md:h-[400px] md:w-[900px] w-full h-[350px] md:ps-10 relative">
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-200">
                        <MyMap />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Find