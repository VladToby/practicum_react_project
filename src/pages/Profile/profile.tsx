import React, { useState, useEffect, FormEvent } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { logout, updateUser } from '../../services/actions/user'
import { RootState, AppDispatch } from '../../services/types'
import styles from './profile.module.scss'

export const ProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user.user)
    const { updateUserRequest, updateUserFailed } = useSelector((state: RootState) => state.user)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [isFormChanged, setIsFormChanged] = useState(false)

    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                password: ''
            }))
        }
    }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setIsFormChanged(true)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (form.password) {
            dispatch(updateUser(form.name, form.email, form.password))
        } else {
            dispatch(updateUser(form.name, form.email))
        }

        setIsFormChanged(false)
    }

    const handleCancel = () => {
        if (user) {
            setForm({
                name: user.name || '',
                email: user.email || '',
                password: ''
            })
        }
        setIsFormChanged(false)
    }

    const handleLogout = () => {
        dispatch(logout())
            .then(() => {
                navigate('/login')
            })
    }

    const isProfilePage = location.pathname === '/profile'

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <ul className={styles.navigation}>
                    <li>
                        <NavLink
                            to="/profile"
                            end
                            className={({ isActive }) =>
                                isActive ? styles.activeLink : styles.link
                            }
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile/orders"
                            className={({ isActive }) =>
                                isActive ? styles.activeLink : styles.link
                            }
                        >
                            История заказов
                        </NavLink>
                    </li>
                    <li>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Выход
                        </button>
                    </li>
                </ul>
                <p className={`${styles.description} text text_type_main-default text_color_inactive mt-20`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={styles.content}>
                {isProfilePage ? (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <Input
                                type="text"
                                placeholder="Имя"
                                name="name"
                                icon="EditIcon"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                type="email"
                                placeholder="Логин"
                                name="email"
                                icon="EditIcon"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-6">
                            <PasswordInput
                                placeholder="Пароль"
                                name="password"
                                icon="EditIcon"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>
                        {updateUserFailed && (
                            <p className="text text_type_main-default text_color_error mb-4">
                                Произошла ошибка при обновлении данных
                            </p>
                        )}
                        {isFormChanged && (
                            <div className={styles.buttons}>
                                <Button
                                    htmlType="button"
                                    type="secondary"
                                    size="medium"
                                    onClick={handleCancel}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    size="medium"
                                    disabled={updateUserRequest}
                                >
                                    {updateUserRequest ? 'Сохраняем...' : 'Сохранить'}
                                </Button>
                            </div>
                        )}
                    </form>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    )
}
