import { useState } from "react"
import InputField from "../components/Input"
import EyeOpen from "../assets/icons/eye-open"
import EyeClosed from "../assets/icons/eye-closed"

import { registerService } from "../services/authService"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await registerService(email, password)
        } catch (error) {
            
        }
    }

    return (
        <div className="flex flex-col h-full py-10">
            <div className="flex flex-col justify-center align-center border border-slate-500 rounded-xl p-10 gap-5">
                <h1 className="text-2xl font-semibold text-center">Inicia sesion</h1>
                <p className="text-xs text-zinc-500 text-center">Inicia sesion para ver todos los productos y descuentos para ti</p>
                <InputField
                    label="Correo"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo electronico"
                />

                <InputField
                    label="Contraseña"
                    placeholder="Ingresa la contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    icon={showPassword ? <EyeOpen /> : <EyeClosed />}
                    onIconClick={() => setShowPassword(!showPassword)}
                />

                <button
                    className=
                    "border rounded-lg bg-slate-950 text-white p-2 mt-4 cursor-pointer hover:bg-slate-200 hover:text-black transition"
                    type="submit"
                >
                    Inicia sesion
                </button>

                <div className="border border-zinc-400"></div>

                <div className="flex justify-center text-sm gap-1">
                    <p>No tienes una cuenta?</p>
                    <a
                        className="underline text-slate-600"
                        href="/registrar"
                    >
                        Crea tu cuenta
                    </a>
                </div>
            </div>
        </div>
    )
}