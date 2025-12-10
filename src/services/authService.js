import api from "../api/axios"

export const registerService = async (data) => {
    const response = await api.post("api/auth/register", data);
    console.log(response)
    return response;
}