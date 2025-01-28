import { FC } from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../types'
import styles from './ingredient-card.module.scss'

interface IngredientCardProps {
    ingredient: IIngredient
    count: number
    onClick: () => void
}

export const IngredientCard: FC<IngredientCardProps> = ({ ingredient, count, onClick }) => {
    return (
        <article className={styles.card} onClick={onClick}>
            {count > 0 && (
                <Counter count={count} size="default" extraClass={styles.counter} />
            )}
            <img
                className={styles.image}
                src={ingredient.image}
                alt={ingredient.name}
            />
            <div className={styles.price}>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${styles.name}`}>
                {ingredient.name}
            </p>
        </article>
    )
}
