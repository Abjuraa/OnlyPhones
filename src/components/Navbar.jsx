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

    console.log(nameToLong({ name: 'Jonathan' }))

    const handleLogout = () => {
        logout();
    }

    return (
        <div className='flex flex-col justify-center align-center w-full bg-slate-100 rounded-b-xl'>
            <ul className="flex flex-row justify-center items-center items-center w-full h-15 gap-10 ">
                {user
                    ? <>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/privada/home">Inicio</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/privada/categorias">Categorias</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/privada/lugarcompra">Donde comprar</Link></li>
                        <button
                            className="bg-blue-200 w-10 p-2 rounded-full cursor-pointer "
                            onClick={() => setIsOpen(!isOpen)}
                        > {shortName(user)}

                            {isOpen && (
                                <div className="absolute mt-10 mt-2 p-3 bg-white border border-slate-200 rounded-lg shadow-lg top-14 z-10">
                                    <div className="flex flex-col justify-start align-start gap-2">
                                        <h1 className='flex border-b border-slate-300 text-sm font-semibold pb-2'>{nameToLong(user)}</h1>
                                        <button
                                            className="text-sm font-semibold cursor-pointer"
                                            onClick={() => handleLogout()}
                                        >
                                            Cerrar sesion
                                        </button>
                                    </div>
                                </div>
                            )}

                        </button>


                    </>
                    : <>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/">Inicio</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/lugarcompra">Donde comprar</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/sobrenosotros">Sobre nosotros</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/login">Inicia sesion</Link></li>
                        <li className="text-sm hover:scale-102 transition duration-300 ease-in-out"> <Link to="/registrar">Registrate</Link></li>
                    </>
                }
            </ul>
        </div>
    )
}

export default Navbar