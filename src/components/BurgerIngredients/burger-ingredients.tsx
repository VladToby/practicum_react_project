import React, { useState, useRef, useMemo } from 'react'
import { useSelector } from '../../services/hooks'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { RootState } from '../../services/types'
import { IngredientCard } from './ingredient-card'
import styles from './burger-ingredients.module.scss'

type TabType = 'bun' | 'sauce' | 'main'

export const BurgerIngredients: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<TabType>('bun')
    const ingredients = useSelector((state: RootState) => state.ingredients.items)
    const { bun, ingredients: selectedIngredients } = useSelector(
        (state: RootState) => state.burgerConstructor
    )

    const containerRef = useRef<HTMLDivElement>(null)
    const bunsRef = useRef<HTMLDivElement>(null)
    const saucesRef = useRef<HTMLDivElement>(null)
    const mainsRef = useRef<HTMLDivElement>(null)

    const counts = useMemo(() => {
        const counter: { [key: string]: number } = {}

        if (bun) {
            counter[bun._id] = 2
        }

        selectedIngredients.forEach((item) => {
            counter[item._id] = (counter[item._id] || 0) + 1
        })

        return counter
    }, [bun, selectedIngredients])

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
                            />
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}
