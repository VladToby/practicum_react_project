import { describe, it, expect } from 'vitest'
import { orderReducer, initialState } from '../order'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED
} from '../../constants'

describe('order reducer', () => {
    it('должен вернуть начальное состояние', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    it('должен обработать CREATE_ORDER_REQUEST', () => {
        const action = {
            type: CREATE_ORDER_REQUEST
        }

        const newState = orderReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            orderRequest: true
        })
    })

    it('должен обработать CREATE_ORDER_SUCCESS', () => {
        const orderNumber = 12345

        const action = {
            type: CREATE_ORDER_SUCCESS,
            payload: orderNumber
        }

        const newState = orderReducer({
            ...initialState,
            orderRequest: true
        }, action)

        expect(newState).toEqual({
            ...initialState,
            orderNumber: orderNumber,
            orderRequest: false,
            orderFailed: false
        })
    })

    it('должен обработать CREATE_ORDER_FAILED', () => {
        const action = {
            type: CREATE_ORDER_FAILED
        }

        const newState = orderReducer({
            ...initialState,
            orderRequest: true
        }, action)

        expect(newState).toEqual({
            ...initialState,
            orderRequest: false,
            orderFailed: true,
            orderNumber: null
        })
    })
})
