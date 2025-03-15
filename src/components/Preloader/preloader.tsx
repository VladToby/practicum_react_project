import React from 'react'
import styles from './preloader.module.scss'

export const Preloader: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
            <p className="text text_type_main-medium">Загрузка...</p>
        </div>
    )
}
