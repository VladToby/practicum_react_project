import { FC, useState, useEffect, useMemo } from 'react'
import { AppHeader } from '../AppHeader/app-header'
import { BurgerIngredients } from '../BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../BurgerConstructor/burger-constructor'
import { ingredientsApi } from '../../services/api'
import { IIngredient } from '../../types'
import styles from './app.module.scss'

export const App: FC = () => {
    const [ingredients, setIngredients] = useState<IIngredient[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                setIsLoading(true)
                const response = await ingredientsApi.getIngredients()
                if (response.success) {
                    setIngredients(response.data)
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setIsLoading(false)
            }
        }

        fetchIngredients()
    }, [])

    // Получаем фиксированный набор ингредиентов для конструктора
    const constructorIngredients = useMemo(() => {
        if (ingredients.length === 0) {
            return {
                bun: null,
                fillings: []
            }
        }

        return {
            bun: ingredients.find(item => item.type === 'bun') || null,
            fillings: ingredients.filter(item => item.type !== 'bun').slice(0, 5)
        }
    }, [ingredients])

    // Считаем количество ингредиентов
    const ingredientCounts = useMemo(() => {
        const counts: { [key: string]: number } = {}

        if (constructorIngredients.bun) {
            counts[constructorIngredients.bun._id] = 1
        }

        constructorIngredients.fillings.forEach(item => {
            counts[item._id] = (counts[item._id] || 0) + 1
        })

        return counts
    }, [constructorIngredients])

    if (isLoading) return <div className={styles.loading}>Loading...</div>
    if (error) return <div className={styles.error}>Error: {error}</div>

    return (
        <div className={styles.app}>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients
                    ingredients={ingredients}
                    counts={ingredientCounts}
                />
                <BurgerConstructor
                    ingredients={ingredients}
                />
            </main>
        </div>
    )
}
