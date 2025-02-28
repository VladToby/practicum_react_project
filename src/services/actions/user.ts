import { userApi } from '../../utils/api'
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    CLEAR_CONSTRUCTOR
} from '../constants'
import { AppThunk, AppDispatch } from '../types'

export const checkUserAuth = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            return;
        }

        dispatch({ type: GET_USER_REQUEST })
        try {
            const res = await userApi.getUser()
            dispatch({
                type: GET_USER_SUCCESS,
                payload: res.user
            })
            return Promise.resolve()
        } catch (error) {
            dispatch({ type: GET_USER_FAILED })
            return Promise.reject(error)
        }
    }
}

export const register = (name: string, email: string, password: string): AppThunk<Promise<void>> => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: REGISTER_REQUEST })
        try {
            const res = await userApi.register(name, email, password)
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.user
            })
            return Promise.resolve()
        } catch (error) {
            dispatch({ type: REGISTER_FAILED })
            return Promise.reject(error)
        }
    }
}

export const login = (email: string, password: string): AppThunk<Promise<void>> => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: LOGIN_REQUEST })
        try {
            const res = await userApi.login(email, password)
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.user
            })
            return Promise.resolve()
        } catch (error) {
            dispatch({ type: LOGIN_FAILED })
            return Promise.reject(error)
        }
    }
}

export const logout = (): AppThunk<Promise<void>> => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: LOGOUT_REQUEST })
        try {
            await userApi.logout()

            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')

            localStorage.removeItem('constructorBun')
            localStorage.removeItem('constructorIngredients')

            dispatch({ type: LOGOUT_SUCCESS })

            dispatch({ type: CLEAR_CONSTRUCTOR })
            return Promise.resolve()
        } catch (error) {
            dispatch({ type: LOGOUT_FAILED })
            return Promise.reject(error)
        }
    }
}

export const updateUser = (name: string, email: string, password?: string): AppThunk<Promise<void>> => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: UPDATE_USER_REQUEST })
        try {
            const res = await userApi.updateUser(name, email, password)
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: res.user
            })
            return Promise.resolve()
        } catch (error) {
            dispatch({ type: UPDATE_USER_FAILED })
            return Promise.reject(error)
        }
    }
}
