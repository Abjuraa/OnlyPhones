import Logo from '../assets/logo.webp'
import Bag from '../assets/shoppingBag.png'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='flex flex-col justify-center align-center w-full bg-slate-100 rounded-b-lg'>

            <ul className="flex flex-row justify-center items-center items-center w-full h-15 gap-10 ">
                <li> <img className='pt-2' src={Logo} alt="" width={35} height={40} /></li>
                <li className="text-sm"> <Link to="/">Inicio</Link></li>
                <li className="text-sm"> <Link to="/categorias">Categorias</Link></li>
                <li className="text-sm"> <Link to="/lugarcompra">Donde comprar</Link></li>
                <li className="text-sm"> <Link to="/sobrenosotros">Sobre nosotros</Link></li>
                <li> <img src={Bag} alt="" width={25} height={20} /></li>

            </ul>
        </div>
    )
}

export default Navbar