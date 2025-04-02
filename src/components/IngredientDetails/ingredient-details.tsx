import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from '../../services/hooks'
import { IIngredient } from '../../types'
import { RootState } from '../../services/types'
import './ingredient-details.scss'

export const IngredientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const ingredients = useSelector((state: RootState) => state.ingredients.items)
    const [ingredient, setIngredient] = useState<IIngredient | null>(null)

    useEffect(() => {
        if (id && ingredients.length) {
            const foundIngredient = ingredients.find(item => item._id === id)
            if (foundIngredient) {
                setIngredient(foundIngredient)
            }
        }
    }, [id, ingredients])

    if (!ingredient) {
        return <div className="text text_type_main-medium">Загрузка...</div>
    }

    return (
        <div className="ingredient-details">
            <img
                src={ingredient.image_large}
                alt={ingredient.name}
                className="ingredient-details__image"
            />
            <h3 className="ingredient-details__title text text_type_main-medium">
                {ingredient.name}
            </h3>
            <div className="ingredient-details__nutrients">
                <div className="ingredient-details__nutrient">
                    <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
                </div>
                <div className="ingredient-details__nutrient">
                    <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
                </div>
                <div className="ingredient-details__nutrient">
                    <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
                </div>
                <div className="ingredient-details__nutrient">
                    <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}
