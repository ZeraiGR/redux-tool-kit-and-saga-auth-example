import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { ProtectedRoute } from './ProtectedRoute'
import { Dashboard } from './Dashboard'
import { Admin } from './Admin'
import { NoMatch } from './NoMatch'

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route
                path="dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="admin"
                element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    )
}
