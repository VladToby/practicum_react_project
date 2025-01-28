import React from 'react'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-details.module.scss'

interface OrderDetailsProps {
    orderNumber: number
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderNumber }) => {
    return (
        <div className={styles.order}>
            <p className={`${styles.number} text text_type_digits-large mb-8`}>
                {String(orderNumber).padStart(6, '0')}
            </p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <div className={styles.done}>
                <CheckMarkIcon type="primary" />
            </div>
            <p className="text text_type_main-default mt-15">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}
