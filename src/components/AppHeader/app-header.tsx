import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.scss'

export const AppHeader: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <div className={styles.leftGroup}>
                        <a href="#" className={`${styles.link} ${styles.linkActive}`}>
                            <BurgerIcon type="primary" />
                            <span className="text text_type_main-default">Конструктор</span>
                        </a>
                        <a href="#" className={styles.link}>
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
                        </a>
                    </div>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <div className={styles.rightGroup}>
                        <a href="#" className={styles.link}>
                            <ProfileIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    )
}
