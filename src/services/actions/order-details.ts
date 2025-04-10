import { request } from '../../utils/api'
import { AppThunk, AppDispatch } from '../types'
import { IOrder } from '../types'

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST'
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS'
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED'
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS'

interface IGetOrderDetailsRequestAction {
    readonly type: typeof GET_ORDER_DETAILS_REQUEST
}

interface IGetOrderDetailsSuccessAction {
    readonly type: typeof GET_ORDER_DETAILS_SUCCESS
    readonly payload: IOrder
}

interface IGetOrderDetailsFailedAction {
    readonly type: typeof GET_ORDER_DETAILS_FAILED
}

interface IClearOrderDetailsAction {
    readonly type: typeof CLEAR_ORDER_DETAILS
}

export type TOrderDetailsActions =
    | IGetOrderDetailsRequestAction
    | IGetOrderDetailsSuccessAction
    | IGetOrderDetailsFailedAction
    | IClearOrderDetailsAction

export const getOrderDetails = (number: number): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST
        })

        try {
            const response = await request(`orders/${number}`)

            if (response.success) {
                dispatch({
                    type: GET_ORDER_DETAILS_SUCCESS,
                    payload: response.orders[0]
                })
            } else {
                dispatch({
                    type: GET_ORDER_DETAILS_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: GET_ORDER_DETAILS_FAILED
            })
        }
    }
}

export const clearOrderDetails = (): IClearOrderDetailsAction => ({
    type: CLEAR_ORDER_DETAILS
})
