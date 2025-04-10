import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { OrderHistory } from '../../components/OrderHistory/order-history'
import { IOrder } from '../../services/types'

export const OrdersHistoryPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleOrderClick = (order: IOrder) => {
        navigate(`/profile/orders/${order.number}`, { state: { background: location } })
    }

    return <OrderHistory onOrderClick={handleOrderClick} />
}
