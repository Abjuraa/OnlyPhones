import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='flex flex-col justify-center align-center w-full bg-slate-100 rounded-b-xl'>
            <ul className="flex flex-row justify-center items-center items-center w-full h-15 gap-10 ">
                <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/">Inicio</Link></li>
                <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/categorias">Categorias</Link></li>
                <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/lugarcompra">Donde comprar</Link></li>
                <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/sobrenosotros">Sobre nosotros</Link></li>
                <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/login">Inicia sesion</Link></li>
                <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/registrar">Registrate</Link></li>
            </ul>
        </div>
    )
}

export default Navbar