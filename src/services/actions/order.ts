import { orderApi } from '../api'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
    CLEAR_CONSTRUCTOR
} from '../constants'
import { AppThunk, AppDispatch } from '../types'

export const createOrder = (ingredients: string[]): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST })
        try {
            const response = await orderApi.createOrder(ingredients)
            if (response && response.success) {
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: response.order.number
                })
                dispatch({ type: CLEAR_CONSTRUCTOR })
            } else {
                dispatch({ type: CREATE_ORDER_FAILED })
            }
        } catch (error) {
            dispatch({ type: CREATE_ORDER_FAILED })
        }
    }
}
