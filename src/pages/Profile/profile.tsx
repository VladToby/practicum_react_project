import React, { useState, useEffect, FormEvent } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../../services/hooks'
import { logout, updateUser } from '../../services/actions/user'
import { useForm } from "../../hooks/useForm.ts"
import styles from './profile.module.scss'

export const ProfilePage: React.FC = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user)
    const { updateUserRequest, updateUserFailed } = useSelector((state) => state.user)

    const initialFormState = {
        name: user?.name || '',
        email: user?.email || '',
        password: ''
    }

    const { values, handleChange, setValues } = useForm(initialFormState)

    const [isFormChanged, setIsFormChanged] = useState(false)

    useEffect(() => {
        if (user) {
            setValues({
                name: user.name || '',
                email: user.email || '',
                password: ''
            })
        }
    }, [user, setValues])

    useEffect(() => {
        if (user) {
            const isChanged =
                values.name !== user.name ||
                values.email !== user.email ||
                values.password !== ''
            setIsFormChanged(isChanged)
        }
    }, [values, user])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (values.password) {
            dispatch(updateUser(values.name, values.email, values.password))
        } else {
            dispatch(updateUser(values.name, values.email))
        }

        setIsFormChanged(false)
    }

    const handleCancel = () => {
        if (user) {
            setValues({
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
                    {isProfilePage
                        ? 'В этом разделе вы можете изменить свои персональные данные'
                        : 'В этом разделе вы можете просмотреть свою историю заказов'
                    }
                </p>
            </div>
            <div className={styles.content}>
                {isProfilePage ? (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div>
                            <Input
                                type="text"
                                placeholder="Имя"
                                name="name"
                                icon="EditIcon"
                                value={values.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                placeholder="Логин"
                                name="email"
                                icon="EditIcon"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <PasswordInput
                                placeholder="Пароль"
                                name="password"
                                icon="EditIcon"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        {updateUserFailed && (
                            <p className="text text_type_main-default text_color_error">
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
