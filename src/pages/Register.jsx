import { useState } from 'react'
import EyeClosed from '../assets/icons/eye-closed.jsx';
import EyeOpen from '../assets/icons/eye-open.jsx';
import InputField from '../components/Input.jsx';
import Iphone from '../components/Iphone.jsx';


function Register() {

    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='flex flex-col w-full h-full py-10'>
            <div className="flex flex-row justify-around">

                <div className="flex flex-col gap-4 px-10 py-10 shadow w-1/3 border border-zinc-400 rounded-xl">
                    <h1 className='flex justify-center font-semibold text-2xl'>Registrate</h1>
                    <p
                        className='flex text-xs text-center text-zinc-500'
                    >
                        Crea tu cuenta para conocer nuestro extenso mercado de celulares
                    </p>

                    <InputField
                        label="Nombre Completo"
                        placeholder="Ingresa tu nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        type="text"
                    />

                    <InputField
                        label="Correo"
                        placeholder="Ingresa tu correo"
                        value={correo}
                        onChange={e => setContrasena(e.target.value)}
                        type="email"
                    />

                    <InputField
                        label="Contraseña"
                        placeholder="Minimo 8 caracteres"
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        icon={showPassword ? <EyeOpen /> : <EyeClosed />}
                        onIconClick={() => setShowPassword(!showPassword)}
                    />

                    <button
                        className="
                            border rounded-lg bg-slate-950 text-white p-2 mt-4 cursor-pointer
                            hover:bg-slate-200 hover:text-black transition
                        "
                        type="button"
                    >
                        Registrarse
                    </button>

                    <div className='border border-zinc-400'>
                    </div>

                    <div className="flex justify-center text-sm gap-1">
                        <p>¿Ya tienes una cuenta?</p>
                        <a
                            className='underline text-slate-600'
                            href="/login">Inicia sesion
                        </a>
                    </div>

                </div>

                <div className="">
                    <Iphone />
                </div>
            </div>
        </div>
    );
}

export default Register;
