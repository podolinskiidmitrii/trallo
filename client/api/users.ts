import { AxiosInstance } from "axios"

export type LoginDto = {
    username: string
    password: string
}

export type RegistrationDto = {
    email: string
    username: string
    fullname?: string
    password: string
}

export const AuthApi = (instance: AxiosInstance) => ({
    async login(dto: LoginDto) {
        const { data } = await instance.post('/auth/login', dto)
        return data;
    },
    async registration(dto: RegistrationDto) {
        const result = await instance.post('/auth/registration', dto)
        return result;
    }   

})

export const UserApi = (instance: AxiosInstance) => ({
    async getAll() {
        const { data } = await instance.get('/users')
        return data;
    }
})