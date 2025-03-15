import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../constants'
import { ingredientsApi } from '../../utils/api'
import { AppThunk, AppDispatch } from '../types'

export const getIngredients = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: GET_INGREDIENTS_REQUEST })
        try {
            const response = await ingredientsApi.getIngredients()
            if (response.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: response.data
                })
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        }
    }
}
