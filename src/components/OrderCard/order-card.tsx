import { FC, useMemo } from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient, IOrder } from '../../services/types'
import { useSelector } from '../../services/hooks'
import styles from './order-card.module.scss'

interface IOrderCardProps {
    order: IOrder
    onClick: () => void
    showStatus?: boolean
}

export const OrderCard: FC<IOrderCardProps> = ({ order, onClick, showStatus = false }) => {
    const { items = [] } = useSelector((state) => state.ingredients)

    const ingredientsMap = useMemo(() => {
        const map = new Map<string, IIngredient>()
        items.forEach(item => {
            map.set(item._id, item)
        })
        return map
    }, [items])

    const orderIngredients = useMemo(() => {
        if (!order || !order.ingredients) return []

        return order.ingredients
            .map(id => ingredientsMap.get(id))
            .filter(ingredient => ingredient !== undefined) as IIngredient[]
    }, [order, ingredientsMap])

    const totalPrice = useMemo(() => {
        return orderIngredients.reduce((sum, item) => sum + item.price, 0)
    }, [orderIngredients])

    const visibleIngredients = orderIngredients.slice(0, 6)

    const hiddenCount = orderIngredients.length > 6 ? orderIngredients.length - 6 : 0

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

    if (!order) {
        return null
    }

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.header}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <FormattedDate
                    className="text text_type_main-default text_color_inactive"
                    date={new Date(order.createdAt)}
                />
            </div>

            <h2 className={`text text_type_main-medium ${styles.title}`}>{order.name}</h2>

            {showStatus && (
                <p className={`text text_type_main-default ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                </p>
            )}

            <div className={styles.content}>
                <div className={styles.ingredients}>
                    {visibleIngredients.map((ingredient, index) => (
                        <div
                            key={index}
                            className={styles.ingredient}
                            style={{ zIndex: 6 - index, left: `${index * 32}px` }}
                        >
                            <img
                                src={ingredient.image_mobile}
                                alt={ingredient.name}
                                className={styles.ingredientImage}
                            />
                            {index === 5 && hiddenCount > 0 && (
                                <div className={styles.hiddenCount}>
                                    <span className="text text_type_main-default">+{hiddenCount}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.price}>
                    <span className="text text_type_digits-default">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}
