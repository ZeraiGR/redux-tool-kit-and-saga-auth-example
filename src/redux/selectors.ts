import { StateSchema } from './main'

export const selectUserAuthData = (state: StateSchema) => state?.user?.authData
export const selectUserAuthDataLoading = (state: StateSchema) =>
    state?.user?.isLoading
export const selectUserAuthDataError = (state: StateSchema) =>
    state?.user?.error
export const selectUserAuthInited = (state: StateSchema) => state?.user?._inited

export const selectPostData = (state: StateSchema) => state?.posts?.posts
export const selectPostError = (state: StateSchema) => state?.posts?.error
export const selectPostLoading = (state: StateSchema) => state?.posts?.isLoading
