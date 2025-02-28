import React, { useState, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { login } from '../../services/actions/user'
import { AppDispatch, RootState } from '../../services/types'
import styles from './login.module.scss'

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()
    const { loginRequest, loginFailed } = useSelector((state: RootState) => state.user)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(login(form.email, form.password))
            .then(() => {
                const { from } = location.state?.from ? location.state : { from: { pathname: '/' } }
                navigate(from)
            })
    }

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium mb-6">Вход</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <EmailInput
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <PasswordInput
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                {loginFailed && (
                    <p className="text text_type_main-default text_color_error mb-4">
                        Ошибка входа. Проверьте логин и пароль.
                    </p>
                )}
                <div>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={loginRequest}
                    >
                        {loginRequest ? 'Входим...' : 'Войти'}
                    </Button>
                </div>
            </form>
            <div className={styles.links}>
                <p className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь?{' '}
                    <Link to="/register" className={styles.link}>
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?{' '}
                    <Link to="/forgot-password" className={styles.link}>
                        Восстановить пароль
                    </Link>
                </p>
            </div>
        </div>
    )
}
