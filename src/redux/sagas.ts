import {
    Effect,
    all,
    call,
    put,
    select,
    take,
    takeEvery,
} from 'redux-saga/effects'
import {
    getAuthData,
    initAuthData,
    setAuthData,
    setError,
    setLoading,
} from './userSlice'
import { getAuthDataFromApi, getPostsFromApi } from '../api/api'
import { AxiosError } from 'axios'
import { setUserDataToLS } from '../utils/localStorage-utils'
import { setPosts, setPostsError, setPostsLoading } from './postsSlice'
import { selectUserAuthData } from './selectors'

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export function* getUserDataSaga({
    payload, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: ReturnType<typeof getAuthData>): Generator<Effect, undefined, any> {
    try {
        yield put(setLoading(true))
        const data = yield call(getAuthDataFromApi, payload)
        yield put(setAuthData(data))
        yield call(setUserDataToLS, data.token)
    } catch (err) {
        if (err instanceof AxiosError) {
            console.log('err', err)
            yield put(setError(err.response?.data?.error ?? err.message))
        } else {
            throw err
        }
    } finally {
        yield put(setLoading(false))
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* getPosts(): Generator<Effect, undefined, any> {
    try {
        yield put(setPostsLoading(true))
        const posts = yield call(getPostsFromApi)
        yield put(setPosts(posts))
    } catch (err) {
        if (err instanceof AxiosError) {
            yield put(setPostsError(err.response?.data?.error ?? err.message))
        } else {
            throw err
        }
    } finally {
        yield put(setPostsLoading(false))
    }
}

export function* watchUserLogin() {
    yield takeEvery(getAuthData, getUserDataSaga)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* getPostsAfterLoginSaga(): Generator<Effect, undefined, any> {
    yield take(setAuthData)
    yield* getPosts()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function* getPostsAfterInitSaga(): Generator<Effect, undefined, any> {
    yield take(initAuthData)
    const isAuth = yield select(selectUserAuthData)
    if (isAuth) {
        yield* getPosts()
    }
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        watchUserLogin(),
        getPostsAfterLoginSaga(),
        getPostsAfterInitSaga(),
    ])
}
