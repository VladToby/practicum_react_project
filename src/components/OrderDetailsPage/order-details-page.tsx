import { FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../../services/hooks'
import { getOrderDetails, clearOrderDetails } from '../../services/actions/order-details'
import { IIngredient } from '../../services/types'
import styles from './order-details-page.module.scss'

interface IOrderDetailsPageProps {
    modal?: boolean
}

export const OrderDetailsPage: FC<IOrderDetailsPageProps> = ({ modal = false }) => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()

    const { currentOrder, orderDetailsRequest, orderDetailsFailed } = useSelector(state => state.order)
    const { orders: allOrders } = useSelector(state => state.wsOrders)
    const { orders: userOrders } = useSelector(state => state.wsUserOrders)
    const { items: allIngredients } = useSelector(state => state.ingredients)

    useEffect(() => {
        if (!currentOrder && id) {
            const orderNumber = parseInt(id)

            const orderFromAll = allOrders.find(order => order.number === orderNumber)

            const orderFromUser = userOrders.find(order => order.number === orderNumber)

            if (!orderFromAll && !orderFromUser) {
                dispatch(getOrderDetails(orderNumber))
            }
        }

        return () => {
            dispatch(clearOrderDetails())
        }
    }, [id, dispatch, currentOrder, allOrders, userOrders])

    const order = useMemo(() => {
        if (currentOrder) return currentOrder

        if (!id) return null

        const orderNumber = parseInt(id)
        const orderFromAll = allOrders.find(order => order.number === orderNumber)
        const orderFromUser = userOrders.find(order => order.number === orderNumber)

        return orderFromAll || orderFromUser || null
    }, [id, currentOrder, allOrders, userOrders])

    const ingredientsMap = useMemo(() => {
        const map = new Map<string, IIngredient>()
        allIngredients.forEach(item => {
            map.set(item._id, item)
        })
        return map
    }, [allIngredients])

    const uniqueIngredients = useMemo(() => {
        if (!order) return []

        const counts = new Map<string, number>()

        order.ingredients.forEach((id: string) => {
            const count = counts.get(id) || 0
            counts.set(id, count + 1)
        })

        return Array.from(counts.entries()).map(([id, count]) => ({
            ingredient: ingredientsMap.get(id),
            count
        })).filter(item => item.ingredient !== undefined)
    }, [order, ingredientsMap])

    const totalPrice = useMemo(() => {
        if (!order) return 0

        return order.ingredients.reduce((sum: number, id: string) => {
            const ingredient = ingredientsMap.get(id)
            return sum + (ingredient ? ingredient.price : 0)
        }, 0)
    }, [order, ingredientsMap])

    const getStatusText = (status: string) => {
        switch (status) {
            case 'created':
                return 'Создан'
            case 'pending':
                return 'Готовится'
            case 'done':
                return 'Выполнен'
            case 'canceled':
                return 'Отменён'
            default:
                return 'Неизвестный статус'
        }
    }

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'done':
                return styles.statusDone
            case 'canceled':
                return styles.statusCanceled
            default:
                return ''
        }
    }

    if (orderDetailsRequest) {
        return (
            <div className={`${styles.container} ${modal ? styles.modal : ''}`}>
                <p className="text text_type_main-medium">Загрузка данных заказа...</p>
            </div>
        )
    }

    if (orderDetailsFailed || (!order && !orderDetailsRequest)) {
        return (
            <div className={`${styles.container} ${modal ? styles.modal : ''}`}>
                <p className="text text_type_main-medium">Ошибка загрузки данных заказа</p>
            </div>
        )
    }

    if (!order) {
        return (
            <div className={`${styles.container} ${modal ? styles.modal : ''}`}>
                <p className="text text_type_main-medium">Заказ не найден</p>
            </div>
        )
    }

    return (
        <div className={`${styles.container} ${modal ? styles.modal : ''}`}>
            <p className={`text text_type_digits-default ${styles.orderNumber}`}>
                #{order.number}
            </p>

            <h2 className={`text text_type_main-medium ${styles.title}`}>{order.name}</h2>

            <p className={`text text_type_main-default ${getStatusClass(order.status)}`}>
                {getStatusText(order.status)}
            </p>

            <div className={styles.composition}>
                <h3 className="text text_type_main-medium">Состав:</h3>

                <div className={styles.ingredientsList}>
                    {uniqueIngredients.map(({ ingredient, count }, index) => (
                        ingredient && (
                            <div key={index} className={styles.ingredientItem}>
                                <div className={styles.ingredientInfo}>
                                    <div className={styles.ingredientImage}>
                                        <img
                                            src={ingredient.image_mobile}
                                            alt={ingredient.name}
                                        />
                                    </div>
                                    <p className="text text_type_main-default">{ingredient.name}</p>
                                </div>

                                <div className={styles.ingredientPrice}>
                                    <p className="text text_type_digits-default">{count} x {ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <FormattedDate
                    className="text text_type_main-default text_color_inactive"
                    date={new Date(order.createdAt)}
                />

                <div className={styles.totalPrice}>
                    <p className="text text_type_digits-default">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}
