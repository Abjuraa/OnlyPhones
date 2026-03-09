import { useNavigate } from "react-router-dom"
import { useState } from "react"
import InputField from "../../components/Input"
import { useAuth } from "../../hooks/useAuth"
import banner from "../../assets/banner/bannerOriginal.png"
import { icons } from "../../assets/icons"
import { sileo } from "sileo"

export default function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { login, error, loading } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            sileo.warning({
                title: "Datos incompletos",
                description: "Todos los campos son obligatorios"
            });
            return;
        }

        const response = await login({ email, password });
        if (!response) return;

        if (response.status === 200) {
            localStorage.setItem("tokenOnlyPhones", response.data.token);
            setTimeout(() => {
                navigate("/privada/home");
                window.location.reload();
            }, 500);
        }
    }

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            <div className="hidden md:flex flex-col h-screen w-1/2 relative">
                <img className="w-full h-full object-cover" src={banner} alt="Banner" />
                <div className="absolute bottom-0 left-0 p-10 w-full bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-bold text-5xl mb-4 w-3/4 shadow-sm">La potencia en tus manos.</p>
                    <p className="text-white text-lg w-3/4 shadow-sm">Descubre la nueva generación de iPhone.</p>
                </div>
            </div>

            <div className="flex flex-col w-full md:w-1/2 justify-center items-center min-h-screen md:min-h-0 bg-white">
                <form onSubmit={handleLogin} className="flex flex-col w-full max-w-md lg:max-w-lg justify-center gap-5 px-6 sm:px-10 py-10">
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
                        icon={showPassword ? <icons.EyeOpen /> : <icons.EyeClosed />}
                        onIconClick={() => setShowPassword(!showPassword)}
                    />

                    <button
                        className={`border rounded-lg bg-blue-500 text-white p-2 mt-4 cursor-pointer hover:bg-blue-600 trasition duration-300 ease-in-out
                            ${loading ? "hover:cursor-not-allowed" : ""}
                            `}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <icons.Loader /> : "Iniciar sesion"}
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
                    <div className="flex flex-row gap-2 border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col">
                            <icons.SoporteIcon />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-sm">¿Necesitas ayuda?</h3>
                            <p className="text-zinc-600 text-xs">Si tienes problema para acceder, visita nuestra
                                <a href="" className="text-blue-500 underline"> seccion de ayuda</a> o contactanos por whatsapp</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}