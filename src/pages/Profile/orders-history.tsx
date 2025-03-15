import React from 'react'
import styles from './orders-history.module.scss'

export const OrdersHistoryPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium">История заказов</p>
            <p className="text text_type_main-default text_color_inactive mt-6">
                Здесь будет отображаться история ваших заказов
            </p>
        </div>
    )
}
