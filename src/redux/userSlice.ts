import { createSlice, createAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User, UserSchema } from './types'
import { UserData } from '../components/LoginForm'
import {
    getUserDataFromLS,
    removeUserDataFromLS,
} from '../utils/localStorage-utils'

const initialState: UserSchema = {
    authData: undefined,
    _inited: false,
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initAuthData: (state) => {
            const res = getUserDataFromLS()

            if (res) state.authData = { token: res }
            if (!res) state.error = res

            state._inited = true
        },
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        logout: (state) => {
            state.authData = undefined
            removeUserDataFromLS()
        },
    },
})

export const GET_AUTH_DATA = 'user/getAuthData'
export const getAuthData = createAction<UserData>(GET_AUTH_DATA)

export const { logout, setAuthData, setError, setLoading, initAuthData } =
    counterSlice.actions
export default counterSlice.reducer
