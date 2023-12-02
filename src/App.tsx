import { Container } from '@gravity-ui/uikit'
import { Header } from './components/Header'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { initAuthData } from './redux/userSlice'
import { selectUserAuthInited } from './redux/selectors'
import { AppRouter } from './components/AppRouter'

function App() {
    const dispatch = useAppDispatch()
    const inited = useAppSelector(selectUserAuthInited)

    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])

    return (
        <Container maxWidth="l">
            <Header />
            {inited && <AppRouter />}
        </Container>
    )
}

export default App
