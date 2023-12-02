import {
    PreloadedState,
    configureStore,
    combineReducers,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import userReducer from './userSlice'
import usersReducer from './postsSlice'
import { PostsSchema, UserSchema } from './types'
import rootSaga from './sagas'

export interface StateSchema {
    user?: UserSchema
    posts?: PostsSchema
}

const sagaMiddleware = createSagaMiddleware({
    onError: (error, { sagaStack }) => {
        // log error to remote service..
        console.log('uncaught unexpected error', error)
        console.log('stack', sagaStack)
    },
})

const rootReducer = combineReducers({
    user: userReducer,
    posts: usersReducer,
})

export const createStoreFactory = (
    initialState?: PreloadedState<StateSchema>
) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    })

    sagaMiddleware.run(rootSaga)

    return store
}

export const store = createStoreFactory()

export type AppStore = ReturnType<typeof createStoreFactory>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
