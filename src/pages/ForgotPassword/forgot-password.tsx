import React, { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { userApi } from '../../utils/api'
import styles from './forgot-password.module.scss'

export const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('')
    const [isRequesting, setIsRequesting] = useState(false)
    const [hasError, setHasError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setIsRequesting(true)
        setHasError(false)

        userApi.forgotPassword(email)
            .then(res => {
                if (res.success) {
                    localStorage.setItem('resetPasswordStarted', 'true')
                    navigate('/reset-password')
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
                    <EmailInput
                        placeholder="Укажите e-mail"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {hasError && (
                    <p className="text text_type_main-default text_color_error mb-4">
                        Произошла ошибка при отправке. Проверьте email и попробуйте снова.
                    </p>
                )}
                <div className="mb-20">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={isRequesting || !email}
                    >
                        {isRequesting ? 'Отправка...' : 'Восстановить'}
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
