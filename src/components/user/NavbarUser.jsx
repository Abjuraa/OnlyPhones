import { Link } from "react-router-dom"

export default function NavbarUser() {
    return (
        <div className='flex flex-col justify-center align-center w-full bg-slate-100 rounded-b-xl'>
            <ul className="flex flex-row justify-center items-center items-center w-full h-15 gap-10 ">
                <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/privada/home">Inicio</Link></li>
                <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/privada/categorias">Categorias</Link></li>
                <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/privada/inicio">Salir</Link></li>
            </ul>
        </div>
    )
}