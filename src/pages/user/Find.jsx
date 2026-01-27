import IconLocation from "../../assets/icons/Location"
import { MyMap } from "../../components/Map"
import { icons } from "../../assets/icons"

function Find() {
    return (
        <div className="flex flex-col h-screen w-full items-start pt-10 px-40">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-6xl">Nuestra Tienda</h1>
                <p className="text-zinc-500 max-w-2xl">Visitanos para conocer lo ultimo en tecnologia y recibir asesoria personalizada de nuestro equipo</p>
            </div>

            <div className="flex flex-row w-full pt-5">
                <div className="flex flex-col">
                    <div className="flex flex-col border rounded-xl border-slate-200">
                        <div className="flex py-3 px-3">
                            {<icons.Tienda />}
                        </div>
                        <div className="flex min-w-[300px]">
                            <div className="flex flex-col w-full pb-3">
                                <h1 className="font-semibold text-lg mt-2 px-3 pb-2">Centro Comercial Punto 13</h1>
                                <div className="flex flex-col px-3">
                                    <p className="text-slate-500 text-sm">Calle 13 # 15-27, Bogotá</p>
                                    <p className="text-sm">Lun - Sab: <span className="text-slate-500">10AM - 8PM</span></p>
                                    <p className="text-sm">Dom: <span className="text-slate-500">10AM - 4PM</span></p>
                                </div>
                                <div className="flex w-full justify-center py-3 px-3">
                                    <button
                                        type="button"
                                        className="flex bg-slate-200 w-full justify-center items-center gap-2 py-2 rounded-xl text-sm font-semibold hover:bg-slate-300 transition duration-300 ease-in-out">
                                        <icons.IconLocation /> Cómo llegar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex h-[350px] w-[900px] ps-10">
                    <MyMap />
                </div>
            </div>
        </div>
    )
}

export default Find