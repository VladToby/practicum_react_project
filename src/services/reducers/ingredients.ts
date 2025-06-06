import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../constants'
import { IIngredientsState } from '../types'

const initialState: IIngredientsState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
}

export const ingredientsReducer = (state = initialState, action: any): IIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                itemsFailed: false,
                items: action.payload,
                itemsRequest: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                itemsFailed: true,
                itemsRequest: false
            }
        }
        default: {
            return state
        }
    }
}
