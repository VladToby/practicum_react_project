import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from "./index.ts"
import { IIngredient } from '../types'

export const addIngredient = (ingredient: IIngredient) => ({
    type: ADD_INGREDIENT,
    payload: ingredient
})

export const removeIngredient = (uuid: string) => ({
    type: REMOVE_INGREDIENT,
    payload: uuid
})

export const moveIngredient = (dragIndex: number, hoverIndex: number) => ({
    type: MOVE_INGREDIENT,
    payload: { dragIndex, hoverIndex }
})

export const clearConstructor = () => ({
    type: CLEAR_CONSTRUCTOR
})
