import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { getIngredients } from '../../services/actions/ingredients'
import { checkUserAuth } from '../../services/actions/user'
import { AppHeader } from '../AppHeader/app-header'
import { HomePage } from '../../pages/Home/home'
import { LoginPage } from '../../pages/Login/login'
import { RegisterPage } from '../../pages/Register/register'
import { ForgotPasswordPage } from '../../pages/ForgotPassword/forgot-password'
import { ResetPasswordPage } from '../../pages/ResetPassword/reset-password'
import { ProfilePage } from '../../pages/Profile/profile'
import { OrdersHistoryPage } from '../../pages/Profile/orders-history'
import { NotFoundPage } from '../../pages/NotFound/not-found'
import { FeedPage } from '../../pages/Feed/feed'
import { OrderPage } from '../../pages/OrderPage/order-page'
import { Modal } from '../Modal/modal'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'
import { OrderDetailsPage } from '../OrderDetailsPage/order-details-page'
import { ProtectedRoute } from '../ProtectedRoute/protected-route'
import { useDispatch } from '../../services/hooks'
import styles from './app.module.scss'

export const App: React.FC = () => {
    const dispatch = useDispatch()
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

                <Route path="/profile/orders/:id" element={
                    <ProtectedRoute element={<OrderPage />} />
                } />

                <Route path="/feed" element={<FeedPage />} />
                <Route path="/feed/:id" element={<OrderPage />} />

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
                    <Route
                        path="/feed/:id"
                        element={
                            <Modal onClose={() => window.history.back()}>
                                <OrderDetailsPage modal={true} />
                            </Modal>
                        }
                    />
                    <Route
                        path="/profile/orders/:id"
                        element={
                            <ProtectedRoute element={
                                <Modal onClose={() => window.history.back()}>
                                    <OrderDetailsPage modal={true} />
                                </Modal>
                            } />
                        }
                    />
                </Routes>
            )}
        </div>
    )
}
