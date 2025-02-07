import {
    SET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS
} from './index.ts'
import { IIngredient } from '../types'

export const setIngredientDetails = (ingredient: IIngredient) => ({
    type: SET_INGREDIENT_DETAILS,
    payload: ingredient
})

export const clearIngredientDetails = () => ({
    type: CLEAR_INGREDIENT_DETAILS
})
