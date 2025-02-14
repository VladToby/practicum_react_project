import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from '../constants'
import { IIngredient, IConstructorIngredient } from '../types'
import { TConstructorActions } from '../actions/burger-constructor'

interface IConstructorState {
    bun: IIngredient | null
    ingredients: IConstructorIngredient[]
}

const initialState: IConstructorState = {
    bun: null,
    ingredients: []
}

export const burgerConstructorReducer = (
    state = initialState,
    action: TConstructorActions
): IConstructorState => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            const item = action.payload
            if (item.type === 'bun') {
                return {
                    ...state,
                    bun: item as IIngredient
                }
            }
            return {
                ...state,
                ingredients: [...state.ingredients, item as IConstructorIngredient]
            }
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uuid !== action.payload)
            }
        }
        case MOVE_INGREDIENT: {
            const ingredients = [...state.ingredients]
            const { dragIndex, hoverIndex } = action.payload
            const dragItem = ingredients[dragIndex]
            ingredients.splice(dragIndex, 1)
            ingredients.splice(hoverIndex, 0, dragItem)
            return {
                ...state,
                ingredients
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return initialState
        }
        default: {
            return state
        }
    }
}
