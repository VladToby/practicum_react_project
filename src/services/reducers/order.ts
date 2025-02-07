import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED
} from '../constants'
import { IOrderState } from '../types'

const initialState: IOrderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false
}

export const orderReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                orderNumber: action.payload,
                orderRequest: false
            }
        }
        case CREATE_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                orderNumber: null
            }
        }
        default: {
            return state
        }
    }
}
