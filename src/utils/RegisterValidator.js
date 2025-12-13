export const RegisterValidator = ({ name, email, password }) => {

    if (!name.trim()) return "El nombre es obligatorio";
    if (!email.trim()) return "El correo es obligatorio";
    if (!email.includes("@")) return "El correo es invalido";
    if (!password.trim()) return "La contraseñae es obligatoria";
    if (password.length < 8) return "La contraseña debe tener al menos 6 caracteres";

    return null;
}