import axios from 'axios';
import { AuthApi, UserApi } from "./users";

export type ApiReturnType = {
    auth: ReturnType<typeof AuthApi>,
    users: ReturnType<typeof UserApi>,
}

export const Api = (): ApiReturnType => {

    const instance = axios.create({
        baseURL: 'http://localhost:5003',
    })

    const api = {
        users: UserApi,
        auth: AuthApi,
    }

    return Object.entries(api).reduce((prev, [key, apiMethods]) => {
        return {
            ...prev,
            [key]: apiMethods(instance)
        }
    }, {} as ApiReturnType)
}