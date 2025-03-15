import React, { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from "../../hooks/useForm.ts"
import { register } from '../../services/actions/user'
import { AppDispatch, RootState } from '../../services/types'
import styles from './register.module.scss'

export const RegisterPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { registerRequest, registerFailed } = useSelector((state: RootState) => state.user)

    const { values, handleChange } = useForm({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(register(values.name, values.email, values.password))
            .then(() => {
                navigate('/')
            })
    }

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className="mb-6">
                    <Input
                        type="text"
                        placeholder="Имя"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <Input
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <PasswordInput
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                {registerFailed && (
                    <p className="text text_type_main-default text_color_error mb-4">
                        Ошибка регистрации. Попробуйте другой email.
                    </p>
                )}
                <div className="mb-20">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={registerRequest}
                    >
                        {registerRequest ? 'Регистрация...' : 'Зарегистрироваться'}
                    </Button>
                </div>
            </form>
            <div className={styles.links}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?{' '}
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    )
}
