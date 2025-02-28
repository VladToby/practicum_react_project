import React, { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { userApi } from '../../utils/api'
import styles from './reset-password.module.scss'

export const ResetPasswordPage: React.FC = () => {
    const [form, setForm] = useState({
        password: '',
        token: ''
    })
    const [isRequesting, setIsRequesting] = useState(false)
    const [hasError, setHasError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const resetStarted = localStorage.getItem('resetPasswordStarted')
        if (!resetStarted) {
            navigate('/forgot-password')
        }
    }, [navigate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setIsRequesting(true)
        setHasError(false)

        userApi.resetPassword(form.password, form.token)
            .then(res => {
                if (res.success) {
                    localStorage.removeItem('resetPasswordStarted')
                    navigate('/login')
                } else {
                    setHasError(true)
                }
            })
            .catch(() => {
                setHasError(true)
            })
            .finally(() => {
                setIsRequesting(false)
            })
    }

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className="mb-6">
                    <PasswordInput
                        placeholder="Введите новый пароль"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <Input
                        type="text"
                        placeholder="Введите код из письма"
                        name="token"
                        value={form.token}
                        onChange={handleChange}
                    />
                </div>
                {hasError && (
                    <p className="text text_type_main-default text_color_error mb-4">
                        Произошла ошибка. Проверьте введенные данные.
                    </p>
                )}
                <div className="mb-20">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={isRequesting || !form.password || !form.token}
                    >
                        {isRequesting ? 'Сохраняем...' : 'Сохранить'}
                    </Button>
                </div>
            </form>
            <div className={styles.links}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?{' '}
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    )
}
