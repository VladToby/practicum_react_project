import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { RootState } from '../../services/types'
import styles from './app-header.module.scss'

export const AppHeader: React.FC = () => {
    const location = useLocation()
    const isAuth = useSelector((state: RootState) => state.user.isAuth)

    const isConstructor = location.pathname === '/'
    const isOrders = location.pathname === '/feed'
    const isProfile = location.pathname.startsWith('/profile')

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <div className={styles.leftGroup}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${styles.link} ${isActive ? styles.linkActive : ''}`
                            }
                        >
                            <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
                            <span className={`text text_type_main-default ${!isConstructor ? 'text_color_inactive' : ''}`}>
                                Конструктор
                            </span>
                        </NavLink>
                        <NavLink
                            to="/feed"
                            className={({ isActive }) =>
                                `${styles.link} ${isActive ? styles.linkActive : ''}`
                            }
                        >
                            <ListIcon type={isOrders ? "primary" : "secondary"} />
                            <span className={`text text_type_main-default ${!isOrders ? 'text_color_inactive' : ''}`}>
                                Лента заказов
                            </span>
                        </NavLink>
                    </div>
                    <div className={styles.logo}>
                        <NavLink to={'/'}>
                            <Logo />
                        </NavLink>
                    </div>
                    <div className={styles.rightGroup}>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `${styles.link} ${isActive ? styles.linkActive : ''}`
                            }
                        >
                            <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                            <span className={`text text_type_main-default ${!isProfile ? 'text_color_inactive' : ''}`}>
                                {isAuth ? 'Личный кабинет' : 'Войти'}
                            </span>
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    )
}
