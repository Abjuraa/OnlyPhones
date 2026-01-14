import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useProducts } from "../../hooks/useProduct"
import Batery from "../../assets/icons/Batery"
import Storage from "../../assets/icons/Storage"
import VerifyBadge from "../../assets/icons/VerifyBadge"
import Shield from "../../assets/icons/Shield"
import WhatsApp from "@/assets/icons/WhatsApp"
import Truck from "@/assets/icons/Truck"
import Money from "@/assets/icons/Money"
import Store from "@/assets/icons/Store"
import Analytic from "@/assets/icons/Analytic"
import Broom from "@/assets/icons/Broom"
import CardInfoProduct from "@/components/CardInfoProduct"

export default function Product() {

    const { id } = useParams();
    const { getProductById, productById } = useProducts();

    useEffect(() => {
        getProductById(id);
    }, [id])


    const priceWhitDiscount = (price, discount) => {
        return price - (price * (discount / 100))
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat("es-CO").format(number)
    }

    function SpecificationsTech({ title, desc }) {
        return (
            <>
                <div className="col-start-1 col-end-2 text-slate-400 font-semibold">{title}</div>
                <div className="col-span-2 col-end-4 text-sm"><p>{desc}</p></div>
            </>
        )
    }

    console.log(productById)
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-row justify-between items-center px-5 py-5">
                <div className="flex text-sm">
                    <a
                        className="font-semibold text-gray-500"
                        href="/privada/categorias"
                    >
                        Catálogo
                    </a>
                    <h1 className="font-semibold text-gray-500"> <span className="px-2">></span>{productById.model}</h1>
                </div>
                <div className="flex flex-row gap-3">
                    <h1 className="bg-green-200 rounded-lg p-1 text-sm text-green-800 font-semibold">{productById.hasAvailable ? 'Disponible' : 'No disponible'}</h1>
                    <h1 className="bg-gray-200 rounded-lg p-1 text-sm font-semibold">{productById.unitsAvailable == 1 ? "Unidad Única" : `${productById.unitsAvailable} Unidades`}</h1>
                </div>
            </div>
            <div className="flex flex-row justify-between px-5 pt-5 pb-5">
                <div className="flex rounded-lg basis-192">
                    <img src={productById.image} alt="" className="w-150 rounded-lg object-cover" />
                </div>

                <div className="flex flex-col justify-start w-2/4 py-5 px-2 gap-1 basis-128">
                    <h1 className="text-4xl font-semibold ">{productById.model}</h1>
                    <h1 className="text-lg text-gray-500">{productById.color}  •  {productById.capacity}</h1>
                    {productById.hasDiscount
                        ? (
                            <div className="flex gap-5 items-end pt-3 pb-3">
                                <h1 className="text-4xl font-semibold">${formatNumber(priceWhitDiscount(productById.price, productById.discount))}</h1>
                                <h1 className="flex line-through text-lg text-gray-500">${formatNumber(productById.price)}</h1>
                            </div>
                        )
                        : (
                            <div className="flex pt-3 pb-3">
                                <h1 className="text-4xl font-semibold">${formatNumber(productById.price)}</h1>
                            </div>
                        )
                    }
                    <div className="flex border-t pb-4"></div>

                    <div className="flex grid grid-cols-2 grid-rows-2 gap-5 pb-5">
                        <div className="flex flex-col border rounded-xl p-4 gap-2">
                            <div className="flex flex-row jusify-center items-center gap-2 text-green-400">
                                <Batery />
                                <h1 className="text-xs font-semibold tracking-widest">SALUD DE BATERIA</h1>
                            </div>
                            <h1 className="text-3xl font-semibold">94%</h1>
                            <h1 className="text-xs text-slate-400">Rendimiento optimo</h1>
                        </div>
                        <div className="flex flex-col border rounded-xl p-4 gap-2">
                            <div className="flex flex-row jusify-center items-center gap-2 text-blue-400">
                                <Storage />
                                <h1 className="text-xs font-semibold tracking-widest">ALMACENAMIENTO</h1>
                            </div>
                            <h1 className="text-3xl font-semibold">{productById.capacity}</h1>
                            <h1 className="text-xs text-slate-400">Capacidad amplia</h1>
                        </div>
                        <div className="flex flex-col border rounded-xl p-4 gap-2">
                            <div className="flex flex-row jusify-center items-center gap-2 text-orange-400">
                                <VerifyBadge />
                                <h1 className="text-xs font-semibold tracking-widest">ALMACENAMIENTO</h1>
                            </div>
                            <h1 className="text-3xl font-semibold">A+</h1>
                            <h1 className="text-xs text-slate-400">Como nuevo</h1>
                        </div>
                        <div className="flex flex-col border rounded-xl p-4 gap-2">
                            <div className="flex flex-row jusify-center items-center gap-2 text-cyan-400">
                                <Shield
                                    color="oklch(78.9% 0.154 211.53)"
                                />
                                <h1 className="text-xs font-semibold tracking-widest">ALMACENAMIENTO</h1>
                            </div>
                            <h1 className="text-3xl font-semibold">90 Dias</h1>
                            <h1 className="text-xs text-slate-400">Cobertura total</h1>
                        </div>
                    </div>
                    <a href="https://wa.me" className="flex bg-green-400 rounded-full justify-center items-center gap-2 p-3">
                        <div className="text-white">
                            <WhatsApp />
                        </div>
                        <button className="text-white font-semibold" type="button">Apartar por WhatsApp</button>
                    </a>
                    <div className="flex pt-4 pb-5">
                        <p className="text-slate-400 text-xs text-center">Al hacer click sera redirigido a una conversacion directa con un asesor para confirmar la disponibilidad y el metodo de pago.</p>
                    </div>
                    <div className="bg-gray-100 rounded-xl p-4">
                        <div className="flex ">
                            <ul>
                                <li className="flex flex-row gap-3 items-center text-slate-600 text-sm">
                                    <Truck /> <span>Envio express a todo el pais (24 - 48hrs)</span>
                                </li>
                                <li className="flex flex-row gap-3 items-center text-slate-600 py-2 text-sm">
                                    <Store /> <span>Retiro en sucursal hoy mismo</span>
                                </li>
                                <li className="flex flex-row gap-3 items-center text-slate-600 text-sm">
                                    <Money /> <span>Se acepta tarjetas, transferencias y efectivo</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex p-5 pb-10">
                <div className="flex flex-col bg-gray-100 w-1/2 p-5 rounded-lg">
                    <h1 className="font-semibold text-lg">Detalles del producto</h1>
                    <div className="grid grid-cols-2 grid-rows-1 pt-5 gap-5">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-sm font-semibold text-slate-400">ESTADO FISICO</h1>
                            <p className="text-sm">
                                El equipo se encuentra en <strong>estado excelente (9.5/10)</strong>. No presenta rayaduras en pantalla. El marco de titanio está impecable, con un ligero detalle estético casi imperceptible cerca del puerto de carga.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-sm font-semibold text-slate-400">HISTORIAL</h1>
                            <p className="text-sm">
                                Único dueño. Nunca abierto ni reparado. Piezas 100% originales verificadas por nuestro equipo técnico. Incluye caja original y cable original.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-5 justify-center items-center py-10">
                <h1 className="text-4xl font-bold">Calidad Certificada</h1>
                <h1 className="pt-5 text-slate-400 w-2/4 text-center text-lg">Cada equipo seminuevo pasa por un riguroso proceso de inspeccion de 40 puntos antes de salir a la venta.</h1>
            </div>

            <div className="grid grid-cols-3 grid-rows-1 pt-5 justify-items-center gap-10 px-10">
                <CardInfoProduct
                    Icon={Analytic}
                    title="Diagnóstico por Software"
                    desc="Validamos que todos los sensores, cámaras y componentes internos funcionen al 100%."
                />

                <CardInfoProduct
                    Icon={Broom}
                    title="Limpieza Profunda"
                    desc="Realizamos limpieza de grado quirúrgico en puertos, bocinas y acabados físicos."
                />

                <CardInfoProduct
                    Icon={Shield}
                    iconColor="oklch(48.8% 0.243 264.376)"
                    title="Garantia Real"
                    desc="Te entregamos una póliza de garantía por escrito respaldada por nuestro taller."
                />
            </div>

            <div className="flex pt-20 justify-center">
                <div className="flex flex-col border-t pt-10 pb-20 w-2/3">
                    <h1 className="font-semibold text-2xl pb-15">Especificaciones Técnicas</h1>
                    <div className="grid grid-cols-3 grid-rows-4 gap-20">
                        <SpecificationsTech
                            title="PANTALLA"
                            desc='Super Retina XDR OLED 6.1" con ProMotion (120Hz)'
                        />
                        <SpecificationsTech
                            title="PROCESADOR"
                            desc='Chip A17 Pro con GPU de 6 núcleos'
                        />
                        <SpecificationsTech
                            title="CAMARAS"
                            desc='Sistema Pro de 48MP (Gran angular, Ultra gran angular y Teleobjetivo)'
                        />
                        <SpecificationsTech
                            title="SEGURIDAD"
                            desc='Face ID de segunda generación ultra rápido'
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}