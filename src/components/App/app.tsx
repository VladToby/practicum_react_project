import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import { AppDispatch } from '../../services/types'
import { AppHeader } from '../AppHeader/app-header'
import { BurgerIngredients } from '../BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../BurgerConstructor/burger-constructor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './app.module.scss'

export const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
            </DndProvider>
        </div>
    )
}
