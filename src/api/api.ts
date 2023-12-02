import axios from 'axios'
import { UserData } from '../components/LoginForm'
import { USER_LOCALSTORAGE_KEY } from '../redux/constants'

export interface LoginResponse {
    token: string
}

export const $api = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
})

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.authorization =
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
    }
    return config
})

export const getAuthDataFromApi = async (payload: UserData) => {
    return $api
        .post<LoginResponse>('login', {
            ...payload,
        })
        .then((res) => res.data)
}

export const getPostsFromApi = async () => {
    return $api.get('posts').then((res) => res.data)
}
