import api from "../api/axios"

export const registerService = async (data) => {
    const response = await api.post("api/auth/register", data);
    return response;
}


export const loginService = async (data) => {
    const response = await api.post("api/auth/login", data);
    return response;
}