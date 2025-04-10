import React from 'react'
import { OrderDetailsPage } from '../../components/OrderDetailsPage/order-details-page'
import styles from './order-page.module.scss'

export const OrderPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <OrderDetailsPage />
        </div>
    )
}
