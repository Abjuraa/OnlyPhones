import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const { user, logout } = useAuth();

    const shortName = (user) => {
        const name = user.name;
        return name.split("")[0];
    }

    const nameToLong = (user) => {
        const name = user.name;

        if (name.length <= 12) return name;

        return name.slice(0, 13) + '...';
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <div className='flex flex-col justify-center align-center w-full bg-slate-100 rounded-b-xl'>
            <ul className="flex flex-row items-center w-full h-15 gap-4 md:gap-10 px-4 md:px-0 whitespace-nowrap md:justify-center scrollbar-hide">
                {user
                    ? <>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out shrink-0"> <Link to="/privada/home">Inicio</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out shrink-0"> <Link to="/privada/categorias">Catálogo</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out shrink-0"> <Link to="/privada/lugarcompra">Donde comprar</Link></li>
                        {user.role === "ADMIN" && (
                            <li className="text-sm hover:scale-102 transition duration-300 ease-in-out shrink-0"> <Link to="/admin/gestionarproductos">Gestionar productos</Link></li>
                        )}
                        <li className="shrink-0 flex items-center shrink-0">
                            <button
                                className="bg-blue-200 w-10 p-2 rounded-full cursor-pointer relative"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {shortName(user)}

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 p-3 bg-white border border-slate-200 rounded-lg shadow-lg top-10 z-10 w-max">
                                        <div className="flex flex-col justify-start align-start gap-2">
                                            <h1 className='flex border-b border-slate-300 text-sm font-semibold pb-2'>{nameToLong(user)}</h1>
                                            <button
                                                className="text-sm font-semibold cursor-pointer text-left"
                                                onClick={() => handleLogout()}
                                            >
                                                Cerrar sesion
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </button>
                        </li>
                    </>
                    : <>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out shrink-0"> <Link to="/">Inicio</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out shrink-0"> <Link to="/lugarcompra">Donde comprar</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out shrink-0"> <Link to="/sobrenosotros">Sobre nosotros</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out shrink-0"> <Link to="/login">Inicia sesion</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out shrink-0"> <Link to="/registrar">Registrate</Link></li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Navbar