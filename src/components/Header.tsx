import { Button, Col, Modal, Row } from '@gravity-ui/uikit'
import { Logo } from './Logo'
import { Navigation } from './Navigation'
import { useAppDispatch } from '../redux/hooks'
import classNames from 'classnames'
import { LoginForm, UserData } from './LoginForm'
import { getAuthData, logout } from '../redux/userSlice'
import { useAppSelector } from '../redux/hooks'
import {
    selectUserAuthData,
    selectUserAuthDataError,
    selectUserAuthDataLoading,
} from '../redux/selectors'
import { useCallback, useState } from 'react'
import { setPosts } from '../redux/postsSlice'
// import { useLocation, useNavigate } from 'react-router-dom'

interface HeaderProps {
    className?: string
}

export const Header = (props: HeaderProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    // const location = useLocation()
    // const navigate = useNavigate()
    const isAuth = useAppSelector(selectUserAuthData)
    const authError = useAppSelector(selectUserAuthDataError)
    const isLoading = useAppSelector(selectUserAuthDataLoading)
    const [open, setOpen] = useState(false)

    const openModal = useCallback(() => setOpen(true), [])
    const closeModal = useCallback(() => setOpen(false), [])
    const hasCloseModel = open && isAuth && !isLoading && !authError

    const userLoginHandler = (data: UserData) => {
        dispatch(getAuthData(data))
    }

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(setPosts([]))
    }

    if (hasCloseModel) {
        closeModal()
        // const origin = location.state?.from?.pathname || '/dashboard'
        // navigate(origin)
    }

    return (
        <>
            <Row space="5" className={classNames('header', className)}>
                <Col s="12" l="2">
                    <Logo />
                </Col>
                <Col />
                <Col s="12" l="6">
                    <Navigation />
                </Col>
                <Col s="12" l="2">
                    {!isAuth && (
                        <Button view="action" size="xl" onClick={openModal}>
                            Войти
                        </Button>
                    )}
                    {isAuth && (
                        <Button view="action" size="xl" onClick={logoutHandler}>
                            Выйти
                        </Button>
                    )}
                </Col>
            </Row>

            <Modal
                contentClassName="auth-modal"
                open={open}
                onClose={closeModal}
                autoFocus
                aria-label="Авторизация"
            >
                <LoginForm loginHandler={userLoginHandler} />
            </Modal>
        </>
    )
}
