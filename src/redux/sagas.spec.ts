import { expectSaga } from 'redux-saga-test-plan'
import { getUserDataSaga } from './sagas'
import { GET_AUTH_DATA, setAuthData, setError, setLoading } from './userSlice'
import userReducer from './userSlice'
import { getAuthDataFromApi } from '../api/api'
import { call } from 'redux-saga/effects'
import { throwError } from 'redux-saga-test-plan/providers'
import { AxiosError, AxiosHeaders } from 'axios'

describe('sagas test', () => {
    test('getUserDataSaga - success case', () => {
        const fakeUser = { username: 'vasya', password: '123' }
        const fakeToken = { token: 'fake-token' }
        const data = {
            payload: fakeUser,
            type: GET_AUTH_DATA,
        }

        return expectSaga(getUserDataSaga, data)
            .provide([[call(getAuthDataFromApi, data.payload), fakeToken]])
            .withReducer(userReducer)
            .put(setLoading(true))
            .put(setAuthData(fakeToken))
            .put(setLoading(false))
            .hasFinalState({
                authData: fakeToken,
                _inited: false,
                isLoading: false,
            })
            .run()
    })

    test('getUserDataSaga - failure case', () => {
        const fakeUser = { username: 'vasya', password: '123' }
        const data = {
            payload: fakeUser,
            type: GET_AUTH_DATA,
        }

        const request = { path: '/login' }
        const headers = new AxiosHeaders()
        const config = {
            url: 'login',
            headers,
        }

        const axiosError = new AxiosError(
            'Request failed with status code 401',
            'ERR_BAD_REQUEST',
            config,
            request,
            {
                status: 401,
                data: { error: 'Invalid credentials' },
                statusText: 'Unauthorized',
                config,
                headers,
            }
        )

        return expectSaga(getUserDataSaga, data)
            .provide([
                [
                    call(getAuthDataFromApi, data.payload),
                    throwError(axiosError),
                ],
            ])
            .put(setLoading(true))
            .put(setError('Invalid credentials'))
            .put(setLoading(false))
            .run()
    })
})
