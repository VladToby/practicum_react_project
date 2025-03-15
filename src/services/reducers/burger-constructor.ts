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

const loadState = (): IConstructorState => {
    try {
        const savedBun = localStorage.getItem('constructorBun')
        const savedIngredients = localStorage.getItem('constructorIngredients')

        return {
            bun: savedBun ? JSON.parse(savedBun) : null,
            ingredients: savedIngredients ? JSON.parse(savedIngredients) : []
        }
    } catch (error) {
        console.error('Error loading constructor state from localStorage', error)
        return {
            bun: null,
            ingredients: []
        }
    }
}

const initialState: IConstructorState = loadState()

const saveState = (state: IConstructorState) => {
    try {
        localStorage.setItem('constructorBun', state.bun ? JSON.stringify(state.bun) : '')
        localStorage.setItem('constructorIngredients', JSON.stringify(state.ingredients))
    } catch (error) {
        console.error('Error saving constructor state to localStorage', error)
    }
}

export const burgerConstructorReducer = (
    state = initialState,
    action: TConstructorActions
): IConstructorState => {
    let newState: IConstructorState;

    switch (action.type) {
        case ADD_INGREDIENT: {
            const item = action.payload
            if (item.type === 'bun') {
                newState = {
                    ...state,
                    bun: item as IIngredient
                }
            } else {
                newState = {
                    ...state,
                    ingredients: [...state.ingredients, item as IConstructorIngredient]
                }
            }
            saveState(newState)
            return newState
        }
        case REMOVE_INGREDIENT: {
            newState = {
                ...state,
                ingredients: state.ingredients.filter(item => item.uuid !== action.payload)
            }
            saveState(newState)
            return newState
        }
        case MOVE_INGREDIENT: {
            const ingredients = [...state.ingredients]
            const { dragIndex, hoverIndex } = action.payload
            const dragItem = ingredients[dragIndex]
            ingredients.splice(dragIndex, 1)
            ingredients.splice(hoverIndex, 0, dragItem)
            newState = {
                ...state,
                ingredients
            }
            saveState(newState)
            return newState
        }
        case CLEAR_CONSTRUCTOR: {
            newState = {
                bun: null,
                ingredients: []
            }
            saveState(newState)
            return newState
        }
        default: {
            return state
        }
    }
}
