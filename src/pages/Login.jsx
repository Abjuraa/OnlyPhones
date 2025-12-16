import { useNavigate } from "react-router-dom"
import { useState } from "react"
import InputField from "../components/Input"
import EyeOpen from "../assets/icons/eye-open"
import EyeClosed from "../assets/icons/eye-closed"
import { useAuth } from "../hooks/useAuth"
import banner from "../assets/banner/bannerOriginal.png"
import SoporteIcon from "../assets/icons/Soporte";

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { login, error, loading } = useAuth();


    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await login({ email, password });
        if (!response) return;

        if (response.status === 200) {
            localStorage.setItem("tokenOnlyPhones", response.data.token);
            navigate("/privada/inicio");
            window.location.reload();
        }
    }

    return (
        <div className="flex flex-row justify-between items-center w-screen">
            <div className="flex flex-col h-screen w-1/2">
                <img className="w-full h-full object-cover" src={banner} alt="" />
                <div className="">
                    <p className="absolute text-white bottom-12 left-5 font-bold text-5xl w-1/2">La potencia en tus manos.</p>
                    <p className="absolute text-white bottom-1 left-5">Descubre la nueva generación de iPhone.</p>
                </div>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col h-screen w-1/3 justify-center gap-5">
                <h1 className="text-3xl font-bold">Bienvenido de nuevo</h1>
                <p className="text-sm text-zinc-500 pb-3">Inicia sesion para ver todos los productos y descuentos que hay disponibles para ti</p>
                <InputField
                    label="Correo electronico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                />

                <InputField
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    icon={showPassword ? <EyeOpen /> : <EyeClosed />}
                    onIconClick={() => setShowPassword(!showPassword)}
                />

                <button
                    className=
                    "border rounded-lg bg-blue-500 text-white p-2 mt-4 cursor-pointer hover:bg-blue-600 trasition duration-300 ease-in-out"
                    type="submit"
                    disabled={loading}
                >
                    Iniciar sesion
                </button>

                <div className="flex justify-center text-sm gap-1">
                    <p>¿Aun no tienes cuenta?</p>
                    <a
                        className=" text-blue-500 font-semibold"
                        href="/registrar"
                    >
                        Crea tu cuenta
                    </a>
                </div>
                <div className="flex flex-row gap-2 border border-zinc-300 rounded-lg p-4">
                    <div className="flex flex-col">
                        <SoporteIcon />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-sm">¿Necesitas ayuda?</h3>
                        <p className="text-zinc-600 text-xs">Si tienes problema para acceder, visita nuestra
                            <a href="" className="text-blue-500 underline"> seccion de ayuda</a> o contactanos por whatsapp</p>
                    </div>
                </div>
            </form>


            <div>
                {error &&
                    (
                        <div className="fixed border border-slate-500 rounded-xl p-3 bottom-2 right-5 z-2 bg-slate-100 text-xs font-semibold shadow-lg fade">
                            <p>{error}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}