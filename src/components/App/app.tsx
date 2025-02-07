import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import { RootState, AppDispatch } from '../../services/types'
import { AppHeader } from '../AppHeader/app-header'
import { BurgerIngredients } from '../BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../BurgerConstructor/burger-constructor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './app.module.scss'

export const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { itemsRequest, itemsFailed, items } = useSelector(
        (state: RootState) => state.ingredients
    )

    const { bun, ingredients: constructorIngredients } = useSelector(
        (state: RootState) => state.burgerConstructor
    )

    const ingredientCounts = useMemo(() => {
        const counts: { [key: string]: number } = {}

        if (bun) {
            counts[bun._id] = 2
        }

        if (constructorIngredients) {
            constructorIngredients.forEach(item => {
                counts[item._id] = (counts[item._id] || 0) + 1
            })
        }

        return counts
    }, [bun, constructorIngredients])

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    if (itemsRequest) {
        return <div className={styles.loading}>Загрузка...</div>
    }

    if (itemsFailed) {
        return <div className={styles.error}>Произошла ошибка при получении данных</div>
    }

    return (
        <div className={styles.app}>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <BurgerIngredients
                        ingredients={items}
                        counts={ingredientCounts}
                    />
                    <BurgerConstructor />
                </main>
            </DndProvider>
        </div>
    )
}
