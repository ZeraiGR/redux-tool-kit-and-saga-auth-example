import { useAuth } from '../hooks/useAuth'

export const Dashboard = () => {
    const token = useAuth()

    return (
        <>
            <h2>Dashboard (Protected)</h2>
            <div>Authenticated as {token?.token}</div>
        </>
    )
}
