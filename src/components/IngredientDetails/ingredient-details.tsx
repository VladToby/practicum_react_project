import React from 'react'
import { IIngredient } from '../../types'
import './ingredient-details.scss'

interface IngredientDetailsProps {
    ingredient: IIngredient
}

export const IngredientDetails: React.FC<IngredientDetailsProps> = ({ ingredient }) => {
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
