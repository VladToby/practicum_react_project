import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, useLocation } from 'react-router-dom'
import { getIngredients } from '../../services/actions/ingredients'
import { checkUserAuth } from '../../services/actions/user'
import { AppDispatch } from '../../services/types'
import { AppHeader } from '../AppHeader/app-header'
import { HomePage } from '../../pages/Home/home'
import { LoginPage } from '../../pages/Login/login'
import { RegisterPage } from '../../pages/Register/register'
import { ForgotPasswordPage } from '../../pages/ForgotPassword/forgot-password'
import { ResetPasswordPage } from '../../pages/ResetPassword/reset-password'
import { ProfilePage } from '../../pages/Profile/profile'
import { OrdersHistoryPage } from '../../pages/Profile/orders-history'
import { NotFoundPage } from '../../pages/NotFound/not-found'
import { Modal } from '../Modal/modal'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'
import { ProtectedRoute } from '../ProtectedRoute/protected-route'
import styles from './app.module.scss'

export const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()
    const background = location.state && location.state.background

    useEffect(() => {
        dispatch(getIngredients())
        dispatch(checkUserAuth())
    }, [dispatch])

    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={
                    <ProtectedRoute element={<LoginPage />} onlyAuth={false} />
                } />

                <Route path="/register" element={
                    <ProtectedRoute element={<RegisterPage />} onlyAuth={false} />
                } />

                <Route path="/forgot-password" element={
                    <ProtectedRoute element={<ForgotPasswordPage />} onlyAuth={false} />
                } />

                <Route path="/reset-password" element={
                    <ProtectedRoute element={<ResetPasswordPage />} onlyAuth={false} />
                } />

                <Route path="/profile" element={
                    <ProtectedRoute element={<ProfilePage />} />
                }>
                    <Route path="orders" element={<OrdersHistoryPage />} />
                </Route>

                <Route path="/ingredients/:id" element={<IngredientDetails />} />

                {/* Маршрут для 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal title="Детали ингредиента" onClose={() => window.history.back()}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    )
}
