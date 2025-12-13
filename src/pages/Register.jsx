import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EyeClosed from '../assets/icons/eye-closed.jsx';
import EyeOpen from '../assets/icons/eye-open.jsx';
import InputField from '../components/Input.jsx';
import Iphone from '../components/Iphone.jsx';
import { useAuth } from "../hooks/useAuth.js"
import Loader from "../assets/icons/Loader.jsx"
import { RegisterValidator } from '../utils/RegisterValidator.js';

function Register() {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");
    const { register, error, loading } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerValidatorError = RegisterValidator({ name, email, password })

        if (registerValidatorError) {
            setFormError(registerValidatorError);
            setTimeout(() => setFormError(""), 3000)
            return;
        }
        const response = await register({ name, email, password });
        if (!response) return

        if (response.status === 200) {
            localStorage.setItem("tokenOnlyPhones", response.data.token);
            setName("");
            setEmail("");
            setPassword("");
            navigate("/login")
        }
    }

    return (
        <div className='flex flex-col w-full h-full py-10'>
            <div className="flex flex-row justify-around">

                <form onSubmit={handleRegister} className="flex flex-col gap-4 px-10 py-10 shadow w-1/3 border border-zinc-400 rounded-xl">
                    <h1 className='flex justify-center font-semibold text-2xl'>Registrate</h1>
                    <p
                        className='flex text-xs text-center text-zinc-500'
                    >
                        Crea tu cuenta para conocer nuestro extenso mercado de celulares
                    </p>

                    <InputField
                        label="Nombre Completo"
                        placeholder="Ingresa tu nombre"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                    />

                    <InputField
                        label="Correo"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                    />

                    <InputField
                        label="Contraseña"
                        placeholder="Minimo 8 caracteres"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        icon={showPassword ? <EyeOpen /> : <EyeClosed />}
                        onIconClick={() => setShowPassword(!showPassword)}
                    />

                    <button
                        className=
                        "border rounded-lg bg-slate-950 text-white p-2 mt-4 cursor-pointer hover:bg-slate-200 hover:text-black transition"

                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Loader /> : "Registrar"}
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
                </form>

                <div className="">
                    <Iphone />
                </div>

                <div>
                    {formError &&
                        (
                            <div className="fixed border border-slate-500 rounded-xl p-3 bottom-2 right-5 z-2 bg-slate-100 text-xs font-semibold shadow-lg fade">
                                <p>{formError}</p>
                            </div>
                        )
                    }

                    {error &&
                        (
                            <div className="fixed border border-slate-500 rounded-xl p-3 bottom-2 right-5 z-2 bg-slate-100 text-xs font-semibold shadow-lg fade">
                            <p>{error}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Register;
