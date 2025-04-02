import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDrop } from 'react-dnd'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { addIngredient, removeIngredient, moveIngredient } from '../../services/actions/burger-constructor'
import { createOrder } from '../../services/actions/order'
import { IIngredient } from '../../services/types'
import { Modal } from '../Modal/modal'
import { OrderDetails } from '../OrderDetails/order-details'
import { useDispatch, useSelector } from '../../services/hooks'
import { ConstructorItem } from './constructor-item'
import styles from './burger-constructor.module.scss'

export const BurgerConstructor: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false)

    const { bun, ingredients: selectedIngredients } = useSelector(
        (state) => state.burgerConstructor
    )

    const { orderRequest } = useSelector(
        (state) => state.order
    )

    const isAuth = useSelector(
        (state) => state.user.isAuth
    )

    const handleDelete = (uuid: string) => {
        dispatch(removeIngredient(uuid))
    }

    const moveItem = (dragIndex: number, hoverIndex: number) => {
        dispatch(moveIngredient(dragIndex, hoverIndex))
    }

    const totalPrice = React.useMemo(() => {
        const bunPrice = bun ? bun.price * 2 : 0
        const ingredientsPrice = selectedIngredients?.length
            ? selectedIngredients.reduce((sum, item) => sum + item.price, 0)
            : 0
        return bunPrice + ingredientsPrice
    }, [bun, selectedIngredients])

    const handleOrderClick = () => {
        if (!bun) return

        if (!isAuth) {
            navigate('/login')
            return
        }

        const orderIngredients = [
            bun._id,
            ...selectedIngredients.map(item => item._id),
            bun._id
        ]

        dispatch(createOrder(orderIngredients))
        setIsOrderModalOpen(true)
    }

    const [{ isHover, itemType }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: IIngredient) {
            dispatch(addIngredient(item))
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            itemType: monitor.getItem()?.type
        }),
    })

    const getDropTargetClass = (targetType: 'bun' | 'ingredient', position?: 'top' | 'bottom') => {
        const isTargetHighlighted = isHover &&
            ((targetType === 'bun' && itemType === 'bun') ||
                (targetType === 'ingredient' && itemType !== 'bun'))

        return `${styles.placeholder} 
            ${isTargetHighlighted ? styles.highlighted : ''} 
            ${position === 'top' ? styles.bunTop : ''} 
            ${position === 'bottom' ? styles.bunBottom : ''}`
    }

    return (
        <>
            <section
                ref={dropTarget}
                className={`${styles.constructor} ${isHover ? styles.hover : ''}`}
            >
                <div className={styles.components}>
                    <div className={styles.bun}>
                        {bun ? (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        ) : (
                            <div className={getDropTargetClass('bun', 'top')}>
                                <p className="text text_type_main-default text_color_inactive">
                                    Выберите булки
                                </p>
                            </div>
                        )}
                    </div>

                    <div className={`${styles.fillings} ${selectedIngredients?.length ? styles.fillingWithContent : ''}`}>
                        {selectedIngredients?.length > 0 ? (
                            selectedIngredients.map((item, index) => (
                                <ConstructorItem
                                    key={item.uuid}
                                    item={item}
                                    index={index}
                                    handleDelete={handleDelete}
                                    moveItem={moveItem}
                                />
                            ))                    ): (
                            <div className={getDropTargetClass('ingredient')}>
                                <p className="text text_type_main-default text_color_inactive">
                                    Выберите начинку
                                </p>
                            </div>
                        )}
                    </div>

                    <div className={styles.bun}>
                        {bun ? (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        ) : (
                            <div className={getDropTargetClass('bun', 'bottom')}>
                                <p className="text text_type_main-default text_color_inactive">
                                    Выберите булки
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.total}>
                    <div className={styles.price}>
                        <span className="text text_type_digits-medium">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleOrderClick}
                        htmlType="button"
                        disabled={!bun || !selectedIngredients?.length || orderRequest}
                    >
                        {orderRequest ? 'Оформляем...' : 'Оформить заказ'}
                    </Button>
                </div>
            </section>
            {isOrderModalOpen && (
                <Modal onClose={() => setIsOrderModalOpen(false)}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    )
}
