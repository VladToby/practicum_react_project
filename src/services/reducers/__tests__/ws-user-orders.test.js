import { describe, it, expect } from 'vitest'
import { wsUserOrdersReducer } from '../ws-user-orders'
import {
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_ERROR,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_GET_MESSAGE,
    USER_WS_CONNECTION_CONNECTING
} from '../../constants/ws'

describe('ws-user-orders reducer', () => {
    const initialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0
    }

    it('должен вернуть начальное состояние', () => {
        expect(wsUserOrdersReducer(undefined, {})).toEqual(initialState)
    })

    it('должен обработать USER_WS_CONNECTION_CONNECTING', () => {
        const action = {
            type: USER_WS_CONNECTION_CONNECTING
        }

        const newState = wsUserOrdersReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            wsConnected: false
        })
    })

    it('должен обработать USER_WS_CONNECTION_SUCCESS', () => {
        const action = {
            type: USER_WS_CONNECTION_SUCCESS,
            payload: {}
        }

        const newState = wsUserOrdersReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            wsConnected: true,
            error: undefined
        })
    })

    it('должен обработать USER_WS_CONNECTION_ERROR', () => {
        const error = new Event('error')

        const action = {
            type: USER_WS_CONNECTION_ERROR,
            payload: error
        }

        const newState = wsUserOrdersReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            wsConnected: false,
            error: error
        })
    })

    it('должен обработать USER_WS_CONNECTION_CLOSED', () => {
        const state = {
            ...initialState,
            wsConnected: true
        }

        const action = {
            type: USER_WS_CONNECTION_CLOSED,
            payload: {}
        }

        const newState = wsUserOrdersReducer(state, action)

        expect(newState).toEqual({
            ...initialState,
            wsConnected: false,
            error: undefined
        })
    })

    it('должен обработать USER_WS_GET_MESSAGE', () => {
        const mockUserOrders = [
            { _id: '3', number: 13579, name: 'Мой заказ 1', status: 'done', ingredients: [] },
            { _id: '4', number: 24680, name: 'Мой заказ 2', status: 'pending', ingredients: [] }
        ]

        const mockPayload = {
            orders: mockUserOrders,
            total: 50,
            totalToday: 5
        }

        const action = {
            type: USER_WS_GET_MESSAGE,
            payload: mockPayload
        }

        const newState = wsUserOrdersReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            orders: mockUserOrders,
            total: 50,
            totalToday: 5
        })
    })
})
