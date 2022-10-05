import { AxiosInstance } from "axios"

export type LoginDto = {
    email:string
    password: string
}

export const AuthApi = (instance: AxiosInstance) => ({
    async login(dto:LoginDto) {
        const { data } = await instance.post('/auth/login', dto)
        return data;
    }
})

export const UserApi = (instance: AxiosInstance) => ({
    async getAll() {
        const { data } = await instance.get('/users')
        return data;
    }
})