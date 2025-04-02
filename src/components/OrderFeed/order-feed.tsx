import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderCard } from '../OrderCard/order-card'
import { IOrder } from '../../services/types/ws-types'
import { wsConnectionStart, wsConnectionStop } from '../../services/actions/ws-orders'
import { WS_URL_ALL_ORDERS } from '../../services/constants/ws'
import { AppDispatch, RootState } from '../../services/types'
import styles from './order-feed.module.scss'

interface IOrderFeedProps {
    onOrderClick: (order: IOrder) => void
}

export const OrderFeed: FC<IOrderFeedProps> = ({ onOrderClick }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { wsConnected = false, orders = [], total = 0, totalToday = 0 } = useSelector((state: RootState) => state.wsOrders || {})

    const doneOrders = orders.filter(order => order.status === 'done').slice(0, 10)
    const pendingOrders = orders.filter(order => order.status === 'pending').slice(0, 10)

    const additionalDoneOrders = orders.filter(order => order.status === 'done').slice(10, 20)

    const additionalPendingOrders = orders.filter(order => order.status === 'pending').slice(10, 20)

    useEffect(() => {
        dispatch(wsConnectionStart(WS_URL_ALL_ORDERS))

        return () => {
            dispatch(wsConnectionStop())
        }
    }, [dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.feed}>
                <h1 className="text text_type_main-large mb-5">Лента заказов</h1>

                <div className={styles.ordersList}>
                    {orders && orders.length > 0 ? (
                        orders.map(order => (
                            <OrderCard
                                key={order._id}
                                order={order}
                                onClick={() => onOrderClick(order)}
                            />
                        ))
                    ) : (
                        <p className="text text_type_main-medium text_color_inactive">
                            {wsConnected ? 'Нет доступных заказов' : 'Загрузка заказов...'}
                        </p>
                    )}
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.ordersStatus}>
                    <div className={styles.statusColumn}>
                        <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                        <div className={styles.orderNumbers}>
                            <div className={styles.readyNumbers}>
                                {doneOrders.map(order => (
                                    <p key={order._id} className={`text text_type_digits-default ${styles.doneNumber}`}>
                                        {order.number}
                                    </p>
                                ))}
                            </div>
                            {additionalDoneOrders.length > 0 && (
                                <div className={styles.readyNumbers}>
                                    {additionalDoneOrders.map(order => (
                                        <p key={order._id} className={`text text_type_digits-default ${styles.doneNumber}`}>
                                            {order.number}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.statusColumn}>
                        <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                        <div className={styles.orderNumbers}>
                            <div className={styles.pendingNumbers}>
                                {pendingOrders.map(order => (
                                    <p key={order._id} className="text text_type_digits-default">
                                        {order.number}
                                    </p>
                                ))}
                            </div>
                            {additionalPendingOrders.length > 0 && (
                                <div className={styles.pendingNumbers}>
                                    {additionalPendingOrders.map(order => (
                                        <p key={order._id} className="text text_type_digits-default">
                                            {order.number}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.totalOrders}>
                    <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                    <p className={`text text_type_digits-large ${styles.totalCount}`}>{total}</p>
                </div>

                <div className={styles.todayOrders}>
                    <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                    <p className={`text text_type_digits-large ${styles.totalCount}`}>{totalToday}</p>
                </div>
            </div>
        </div>
    )
}
