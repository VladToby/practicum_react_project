import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { OrderFeed } from '../../components/OrderFeed/order-feed'
import { IOrder } from '../../services/types/ws-types'

export const FeedPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [_selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)

    const handleOrderClick = (order: IOrder) => {
        setSelectedOrder(order)
        navigate(`/feed/${order.number}`, { state: { background: location } })
    }

    return (
        <>
            <OrderFeed onOrderClick={handleOrderClick} />
        </>
    )
}
