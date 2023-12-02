import { useAuth } from '../hooks/useAuth'

export const Admin = () => {
    const token = useAuth()

    return (
        <>
            <h2>Admin (Protected)</h2>
            <div>Authenticated as {token?.token}</div>
        </>
    )
}
