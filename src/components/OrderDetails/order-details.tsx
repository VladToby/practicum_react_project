import React from 'react'
import { useSelector } from 'react-redux'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { RootState } from '../../services/types'
import styles from './order-details.module.scss'

export const OrderDetails: React.FC = () => {
    const { orderNumber, orderRequest, orderFailed } = useSelector(
        (state: RootState) => state.order
    )

    if (orderRequest) {
        return <p className="text text_type_main-medium">Оформляем заказ...</p>
    }

    if (orderFailed) {
        return <p className="text text_type_main-medium">Произошла ошибка при оформлении заказа</p>
    }

    return (
        <div className={styles.order}>
            <p className={`${styles.number} text text_type_digits-large`}>
                {orderNumber ? String(orderNumber).padStart(6, '0') : ''}
            </p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <div className={styles.done}>
                <CheckMarkIcon type="primary" />
            </div>
            <p className="text text_type_main-default">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}
