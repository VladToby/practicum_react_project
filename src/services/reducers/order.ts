import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED
} from '../constants'
import {
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILED,
    CLEAR_ORDER_DETAILS
} from '../actions/order-details'
import { IOrderState } from '../types'

const initialState: IOrderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
    currentOrder: null,
    orderDetailsRequest: false,
    orderDetailsFailed: false
}

export const orderReducer = (state = initialState, action: any): IOrderState => {
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
        case GET_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                orderDetailsRequest: true,
                orderDetailsFailed: false
            }
        }
        case GET_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                orderDetailsRequest: false,
                orderDetailsFailed: false,
                currentOrder: action.payload
            }
        }
        case GET_ORDER_DETAILS_FAILED: {
            return {
                ...state,
                orderDetailsRequest: false,
                orderDetailsFailed: true
            }
        }
        case CLEAR_ORDER_DETAILS: {
            return {
                ...state,
                currentOrder: null
            }
        }
        default: {
            return state
        }
    }
}
