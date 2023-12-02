import { Text, TextInput, Button, spacing, Flex } from '@gravity-ui/uikit'
import { useState } from 'react'
import {
    selectUserAuthDataError,
    selectUserAuthDataLoading,
} from '../redux/selectors'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setError } from '../redux/userSlice'

export interface UserData {
    username: string
    password: string
}

interface LoginFormProps {
    loginHandler: (userdata: UserData) => void
}

export const LoginForm = ({ loginHandler }: LoginFormProps) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()
    const authError = useAppSelector(selectUserAuthDataError)
    const isLoading = useAppSelector(selectUserAuthDataLoading)

    const changeNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setUsername(target.value)
        dispatch(setError(''))
    }

    const changePasswordHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setPassword(target.value)
        dispatch(setError(''))
    }

    const loginBtnHandler = () => {
        loginHandler({ username, password })
    }

    return (
        <Flex className="modal-wrapper" direction="column">
            <Text
                className={`${spacing({ mb: 4 })} modal-title`}
                variant="header-1"
            >
                LoginForm
            </Text>
            <TextInput
                className={spacing({ mb: 4 })}
                autoFocus
                placeholder="Имя"
                size="xl"
                value={username}
                onChange={changeNameHandler}
            />
            <TextInput
                className={spacing({ mb: 4 })}
                placeholder="Пароль"
                type="password"
                size="xl"
                value={password}
                onChange={changePasswordHandler}
            />
            {authError && (
                <Text
                    className={`${spacing({ mb: 4 })}`}
                    variant="body-3"
                    color="danger-heavy"
                >
                    {authError}
                </Text>
            )}
            <Flex alignSelf={'flex-end'}>
                <Button
                    view="action"
                    size="xl"
                    onClick={loginBtnHandler}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Войти
                </Button>
            </Flex>
        </Flex>
    )
}
