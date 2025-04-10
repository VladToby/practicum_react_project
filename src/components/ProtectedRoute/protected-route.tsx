import { FC, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from '../../services/hooks'
import { RootState } from '../../services/types'
import { Preloader } from "../Preloader/preloader"

interface ProtectedRouteProps {
    element: ReactElement
    onlyAuth?: boolean
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, onlyAuth = true }) => {
    const { isAuth, getUserRequest } = useSelector((state: RootState) => state.user)
    const location = useLocation()

    if (getUserRequest) {
        return <Preloader />
    }

    if (onlyAuth && !isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (!onlyAuth && isAuth) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Navigate to={from} replace />
    }

    return element
}
