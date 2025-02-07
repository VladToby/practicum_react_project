import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED
} from "./index.ts"
import { AppThunk, AppDispatch } from '../types'
import { API_URL } from '../api'

export const createOrder = (ingredients: string[]): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ingredients
                })
            })

            if (response.ok) {
                const data = await response.json()
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: data.order.number
                })
            } else {
                dispatch({
                    type: CREATE_ORDER_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: CREATE_ORDER_FAILED
            })
        }
    }
}
