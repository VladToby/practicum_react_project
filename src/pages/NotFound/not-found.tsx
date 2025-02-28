import React from 'react'
import { Link } from 'react-router-dom'
import styles from './not-found.module.scss'

export const NotFoundPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className="text text_type_digits-large">404</h1>
            <p className="text text_type_main-medium mt-10 mb-10">Страница не найдена</p>
            <Link to="/" className={styles.link}>
                <span className="text text_type_main-default">На главную</span>
            </Link>
        </div>
    )
}
