import {
    SET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS
} from '../constants'
import { IIngredient } from '../types'

interface IIngredientDetailsState {
    item: IIngredient | null
}

export const initialState: IIngredientDetailsState = {
    item: null
}

export const ingredientDetailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS: {
            return {
                ...state,
                item: action.payload
            }
        }
        case CLEAR_INGREDIENT_DETAILS: {
            return initialState
        }
        default: {
            return state
        }
    }
}
