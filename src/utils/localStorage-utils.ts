import { USER_LOCALSTORAGE_KEY } from '../redux/constants'

export const getUserDataFromLS = () => {
    const userToken = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    if (userToken) return userToken
}

export const removeUserDataFromLS = () => {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
}

export const setUserDataToLS = (token: string) => {
    const value = JSON.stringify(token)
    localStorage.setItem(USER_LOCALSTORAGE_KEY, value)
}
