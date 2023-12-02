import { createSlice } from '@reduxjs/toolkit'
import { PostsSchema } from './types'

const initialState: PostsSchema = {
    isLoading: false,
    error: undefined,
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        setPostsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setPostsError: (state, action) => {
            state.error = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setPosts, setPostsError, setPostsLoading } = postsSlice.actions

export default postsSlice.reducer
