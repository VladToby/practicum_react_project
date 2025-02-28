import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BurgerIngredients } from '../../components/BurgerIngredients/burger-ingredients'
import { BurgerConstructor } from '../../components/BurgerConstructor/burger-constructor'
import styles from './home.module.scss'

export const HomePage: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </DndProvider>
    )
}
