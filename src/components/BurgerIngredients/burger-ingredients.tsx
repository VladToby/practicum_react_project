import React, { useState, useRef } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../types'
import { Modal } from '../Modal/modal'
import { IngredientDetails } from '../IngredientDetails/ingredient-details'
import styles from './burger-ingredients.module.scss'
import { IngredientCard } from './ingredient-card'

interface BurgerIngredientsProps {
    ingredients: IIngredient[]
    counts: { [key: string]: number }
}

type TabType = 'bun' | 'sauce' | 'main'

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ingredients, counts}) => {
    const [currentTab, setCurrentTab] = useState<TabType>('bun')
    const [selectedIngredient, setSelectedIngredient] = useState<IIngredient | null>(null)

    const containerRef = useRef<HTMLDivElement>(null)
    const bunsRef = useRef<HTMLDivElement>(null)
    const saucesRef = useRef<HTMLDivElement>(null)
    const mainsRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        if (!containerRef.current || !bunsRef.current || !saucesRef.current || !mainsRef.current) return

        const containerTop = containerRef.current.getBoundingClientRect().top
        const bunsTop = Math.abs(bunsRef.current.getBoundingClientRect().top - containerTop)
        const saucesTop = Math.abs(saucesRef.current.getBoundingClientRect().top - containerTop)
        const mainsTop = Math.abs(mainsRef.current.getBoundingClientRect().top - containerTop)

        const minOffset = Math.min(bunsTop, saucesTop, mainsTop)

        if (minOffset === bunsTop) setCurrentTab('bun')
        else if (minOffset === saucesTop) setCurrentTab('sauce')
        else setCurrentTab('main')
    }

    const handleTabClick = (tab: TabType) => {
        setCurrentTab(tab)
        const element = {
            bun: bunsRef.current,
            sauce: saucesRef.current,
            main: mainsRef.current
        }[tab]

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleIngredientClick = (ingredient: IIngredient) => {
        setSelectedIngredient(ingredient)
    }

    const closeModal = () => {
        setSelectedIngredient(null)
    }

    const buns = ingredients.filter(item => item.type === 'bun')
    const sauces = ingredients.filter(item => item.type === 'sauce')
    const mains = ingredients.filter(item => item.type === 'main')

    return (
        <section className={styles.ingredients}>
            <h1 className={`text text_type_main-large ${styles.title}`}>
                Соберите бургер
            </h1>

            <div className={styles.tabs}>
                <Tab
                    value="bun"
                    active={currentTab === 'bun'}
                    onClick={() => handleTabClick('bun')}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={currentTab === 'sauce'}
                    onClick={() => handleTabClick('sauce')}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={currentTab === 'main'}
                    onClick={() => handleTabClick('main')}
                >
                    Начинки
                </Tab>
            </div>

            <div
                className={styles.content}
                ref={containerRef}
                onScroll={handleScroll}
            >
                <section ref={bunsRef} className={styles.section}>
                    <h2 className={`text text_type_main-medium ${styles.sectionTitle}`}>Булки</h2>
                    <div className={styles.grid}>
                        {buns.map(item => (
                            <IngredientCard
                                key={item._id}
                                ingredient={item}
                                count={counts[item._id] || 0}
                                onClick={() => handleIngredientClick(item)}
                            />
                        ))}
                    </div>
                </section>

                <section ref={saucesRef} className={styles.section}>
                    <h2 className={`text text_type_main-medium ${styles.sectionTitle}`}>Соусы</h2>
                    <div className={styles.grid}>
                        {sauces.map(item => (
                            <IngredientCard
                                key={item._id}
                                ingredient={item}
                                count={counts[item._id] || 0}
                                onClick={() => handleIngredientClick(item)}
                            />
                        ))}
                    </div>
                </section>

                <section ref={mainsRef} className={styles.section}>
                    <h2 className={`text text_type_main-medium ${styles.sectionTitle}`}>Начинки</h2>
                    <div className={styles.grid}>
                        {mains.map(item => (
                            <IngredientCard
                                key={item._id}
                                ingredient={item}
                                count={counts[item._id] || 0}
                                onClick={() => handleIngredientClick(item)}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {selectedIngredient && (
                <Modal title="Детали ингредиента" onClose={closeModal}>
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
            )}
        </section>
    )
}
