import { describe, it, expect } from 'vitest'
import { userReducer, initialState } from '../user'
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED
} from '../../constants'

describe('user reducer', () => {
    it('должен вернуть начальное состояние', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    it('должен обработать REGISTER_REQUEST', () => {
        const action = {
            type: REGISTER_REQUEST
        }

        const newState = userReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            registerRequest: true,
            registerFailed: false
        })
    })

    it('должен обработать REGISTER_SUCCESS', () => {
        const user = {
            name: 'Test User',
            email: 'test@example.com'
        }

        const action = {
            type: REGISTER_SUCCESS,
            payload: user
        }

        const newState = userReducer({
            ...initialState,
            registerRequest: true
        }, action)

        expect(newState).toEqual({
            ...initialState,
            registerRequest: false,
            user: user,
            isAuth: true
        })
    })

    it('должен обработать REGISTER_FAILED', () => {
        const action = {
            type: REGISTER_FAILED
        }

        const newState = userReducer({
            ...initialState,
            registerRequest: true
        }, action)

        expect(newState).toEqual({
            ...initialState,
            registerRequest: false,
            registerFailed: true
        })
    })

    it('должен обработать LOGIN_REQUEST', () => {
        const action = {
            type: LOGIN_REQUEST
        }

        const newState = userReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            loginRequest: true,
            loginFailed: false
        })
    })

    it('должен обработать LOGIN_SUCCESS', () => {
        const user = {
            name: 'Test User',
            email: 'test@example.com'
        }

        const action = {
            type: LOGIN_SUCCESS,
            payload: user
        }

        const newState = userReducer({
            ...initialState,
            loginRequest: true
        }, action)

        expect(newState).toEqual({
            ...initialState,
            loginRequest: false,
            user: user,
            isAuth: true
        })
    })

    it('должен обработать LOGIN_FAILED', () => {
        const action = {
            type: LOGIN_FAILED
        }

        const newState = userReducer({
            ...initialState,
            loginRequest: true
        }, action)

        expect(newState).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true
        })
    })
})
