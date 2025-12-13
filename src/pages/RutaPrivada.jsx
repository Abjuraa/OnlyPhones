import { useAuth } from '../context/AuthContext'

export default function RutaPrivada() {

    const deleteToken = () => {
        localStorage.removeItem("tokenOnlyPhones");
        window.location.reload();
    }

    const { logout } = useAuth();
    return (
        <div className="flex flex-col">
            <h1>Ruta protegida</h1>

            <button onClick={logout}>
                Cerrar cuenta
            </button>
        </div>
    )
}