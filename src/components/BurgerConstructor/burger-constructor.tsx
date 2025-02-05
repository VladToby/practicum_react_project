import React, { FC } from 'react'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../types'
import { Modal } from '../Modal/modal'
import { OrderDetails } from '../OrderDetails/order-details'
import styles from './burger-constructor.module.scss'

interface BurgerConstructorProps {
    ingredients: IIngredient[]
}

export const BurgerConstructor: FC<BurgerConstructorProps> = ({ ingredients }) => {
    const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false)

    // Хардкод для демонстрации
    const bun = ingredients.find(item => item.type === 'bun')
    const fillings = ingredients.filter(item => item.type !== 'bun').slice(0, 5)

    const totalPrice = React.useMemo(() => {
        const bunPrice = bun ? bun.price * 2 : 0
        const fillingsPrice = fillings.reduce((sum, item) => sum + item.price, 0)
        return bunPrice + fillingsPrice
    }, [bun, fillings])

    return (
        <>
            <section className={styles.container}>
                <div className={styles.components}>
                    {bun && (
                        <div className={styles.bun}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    )}

                    <div className={styles.fillings}>
                        {fillings.map((item, index) => (
                            <div key={index} className={styles.filling}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </div>
                        ))}
                    </div>

                    {bun && (
                        <div className={styles.bun}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.total}>
                    <div className={styles.price}>
                        <span className="text text_type_digits-medium">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => setIsOrderModalOpen(true)}
                        htmlType={'submit'}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>

            {isOrderModalOpen && (
                <Modal onClose={() => setIsOrderModalOpen(false)}>
                    <OrderDetails orderNumber={34536} />
                </Modal>
            )}
        </>
    )
}
