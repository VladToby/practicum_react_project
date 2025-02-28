import { FC, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/types'

interface ProtectedRouteProps {
    element: ReactElement
    onlyAuth?: boolean
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, onlyAuth = true }) => {
    const isAuth = useSelector((state: RootState) => state.user.isAuth)
    const location = useLocation()

    if (onlyAuth && !isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (!onlyAuth && isAuth) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Navigate to={from} replace />
    }

    return element
}
