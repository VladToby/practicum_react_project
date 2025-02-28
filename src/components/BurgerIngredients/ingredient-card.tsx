import { FC } from 'react'
import { useDrag } from 'react-dnd'
import { useLocation, useNavigate } from 'react-router-dom'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../types'
import styles from './ingredient-card.module.scss'

interface IngredientCardProps {
    ingredient: IIngredient
    count: number
}

export const IngredientCard: FC<IngredientCardProps> = ({ ingredient, count }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/ingredients/${ingredient._id}`, {
            state: { background: location }
        })
    }

    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <article
            ref={dragRef}
            className={`${styles.card} ${isDrag ? styles.dragging : ''}`}
            onClick={handleClick}
        >
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
