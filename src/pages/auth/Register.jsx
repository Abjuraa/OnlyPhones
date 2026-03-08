import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/Input.jsx';
import { useAuth } from "../../hooks/useAuth.js"
import { RegisterValidator } from '../../utils/RegisterValidator.js';
import { icons } from '../../assets/icons/index.js';
import { sileo } from 'sileo';

function Register() {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const { register, loading } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerValidatorError = RegisterValidator({ name, email, password, confirmPassword })

        if (registerValidatorError) {
            sileo.warning({
                title: "Llena todos los campos",
                description: registerValidatorError
            });
            return;
        }
        if (!checked) {
            sileo.warning({
                title: "Acepta los terminos y condiciones",
                description: "Debes aceptar los terminos y condiciones",
            });
            return;
        }
        const response = await register({ name, email, password });
        if (!response) return

        if (response.status === 200) {
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


                <form onSubmit={handleRegister} className="flex flex-col align-center justify-center gap-4 px-10 py-10 lg:w-max-1/3 shadow rounded-2xl border border-gray-200">
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
                        icon={showPassword ? <icons.EyeOpen /> : <icons.EyeClosed />}
                        onIconClick={() => setShowPassword(!showPassword)}
                    />

                    <InputField
                        label="Confirmar contraseña"
                        placeholder="Confirma la contraseña"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type={showConfirmPassword ? "text" : "password"}
                        icon={showConfirmPassword ? <icons.EyeOpen /> : <icons.EyeClosed />}
                        onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />

                    <label className="flex text-sm text-zinc-500 gap-3 items-center justify-center">
                        <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
                        <span>
                            He leido y acepto la <a href="" className='text-blue-500'>Politica de Privacidad</a> y los <a href="" className='text-blue-500'>Terminos de Uso.</a>
                        </span>
                    </label>


                    <button
                        className={`border rounded-lg bg-blue-500 text-white p-2 mt-4 cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out
                            ${loading ? "hover:cursor-not-allowed" : ""}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <icons.Loader /> : "Crear cuenta"}
                    </button>

                    <div className="flex justify-center text-sm gap-1">
                        <p>¿Ya tienes una cuenta?</p>
                        <a
                            className='text-blue-500'
                            href="/login">Inicia sesion
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
