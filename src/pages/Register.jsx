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
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formError, setFormError] = useState("");
    const { register, error, loading } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerValidatorError = RegisterValidator({ name, email, password, confirmPassword })

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
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="flex flex-col">
                    <h1 className='text-4xl font-semibold text-center'>Crea tu cuenta</h1>
                    <p className='text-center text-sm text-zinc-500'>Una sola cuenta para todo lo que te guste</p>
                </div>


                <form onSubmit={handleRegister} className="flex flex-col align-center justify-center gap-4 px-10 py-10 w-1/3 shadow rounded-2xl border border-gray-200">
                    <InputField
                        label="Nombre Completo"
                        placeholder="Nombre y apellido"
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

                    <InputField
                        label="Confirmar contraseña"
                        placeholder="Confirma la contraseña"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type={showConfirmPassword ? "text" : "password"}
                        icon={showConfirmPassword ? <EyeOpen /> : <EyeClosed />}
                        onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />

                    <label className="flex text-sm text-zinc-500 gap-3 items-center justify-center">
                        <input type="checkbox" name="" id="" />
                        <span>
                            He leido y acepto la <a href="" className='text-blue-500'>Politica de Privacidad</a> y los <a href="" className='text-blue-500'>Terminos de Uso.</a>
                        </span>
                    </label>


                    <button
                        className=
                        "border rounded-lg bg-blue-500 text-white p-2 mt-4 cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"

                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Loader /> : "Crear cuenta"}
                    </button>

                    <div className="flex justify-center text-sm gap-1">
                        <p>¿Ya tienes una cuenta?</p>
                        <a
                            className='text-blue-500'
                            href="/login">Inicia sesion
                        </a>
                    </div>
                </form>

                <div>
                    {formError &&
                        (
                            <div className="fixed p-3 bottom-2 right-5 z-2 bg-slate-200 rounded-xl text-xs font-semibold shadow-lg fade">
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
