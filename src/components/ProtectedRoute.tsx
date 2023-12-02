import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
    children?: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = useAuth()
    const location = useLocation()

    if (!token) {
        return <Navigate to="/home" replace state={{ from: location }} />
    }

    return children
}
