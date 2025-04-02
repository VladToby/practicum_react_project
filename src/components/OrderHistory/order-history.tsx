import { FC, useEffect } from 'react'
import { OrderCard } from '../OrderCard/order-card'
import { IOrder } from '../../services/types'
import { wsUserConnectionStart, wsUserConnectionStop } from '../../services/actions/ws-user-orders'
import { WS_URL_USER_ORDERS } from '../../services/constants/ws'
import { useDispatch, useSelector } from '../../services/hooks'
import styles from './order-history.module.scss'

interface IOrderHistoryProps {
    onOrderClick: (order: IOrder) => void
}

export const OrderHistory: FC<IOrderHistoryProps> = ({ onOrderClick }) => {
    const dispatch = useDispatch()
    const { wsConnected, orders = [] } = useSelector((state) => state.wsUserOrders)

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '')

        if (accessToken) {
            const url = `${WS_URL_USER_ORDERS}?token=${accessToken}`
            dispatch(wsUserConnectionStart(url))
        }

        return () => {
            dispatch(wsUserConnectionStop())
        }
    }, [dispatch])

    return (
        <div className={styles.ordersList}>
            {orders && orders.length > 0 ? (
                [...orders]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map(order => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            onClick={() => onOrderClick(order)}
                            showStatus={true}
                        />
                    ))
            ) : (
                <p className="text text_type_main-medium text_color_inactive">
                    {wsConnected ? 'У вас пока нет заказов' : 'Загрузка истории заказов...'}
                </p>
            )}
        </div>
    )
}
