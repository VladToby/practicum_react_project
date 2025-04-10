import { describe, it, expect } from 'vitest'
import { wsOrdersReducer } from '../ws-orders'
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_CONNECTING
} from '../../constants/ws'

describe('ws-orders reducer', () => {
    const initialState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0
    }

    it('должен вернуть начальное состояние', () => {
        expect(wsOrdersReducer(undefined, {})).toEqual(initialState)
    })

    it('должен обработать WS_CONNECTION_CONNECTING', () => {
        const action = {
            type: WS_CONNECTION_CONNECTING
        }

        const newState = wsOrdersReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            wsConnected: false
        })
    })

    it('должен обработать WS_CONNECTION_SUCCESS', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS,
            payload: {}
        }

        const newState = wsOrdersReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            wsConnected: true,
            error: undefined
        })
    })

    it('должен обработать WS_CONNECTION_ERROR', () => {
        const error = new Event('error')

        const action = {
            type: WS_CONNECTION_ERROR,
            payload: error
        }

        const newState = wsOrdersReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            wsConnected: false,
            error: error
        })
    })

    it('должен обработать WS_CONNECTION_CLOSED', () => {
        const state = {
            ...initialState,
            wsConnected: true
        }

        const action = {
            type: WS_CONNECTION_CLOSED,
            payload: {}
        }

        const newState = wsOrdersReducer(state, action)

        expect(newState).toEqual({
            ...initialState,
            wsConnected: false,
            error: undefined
        })
    })

    it('должен обработать WS_GET_MESSAGE', () => {
        const mockOrders = [
            { _id: '1', number: 12345, name: 'Заказ 1', status: 'done', ingredients: [] },
            { _id: '2', number: 67890, name: 'Заказ 2', status: 'pending', ingredients: [] }
        ]

        const mockPayload = {
            orders: mockOrders,
            total: 100,
            totalToday: 10
        }

        const action = {
            type: WS_GET_MESSAGE,
            payload: mockPayload
        }

        const newState = wsOrdersReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            orders: mockOrders,
            total: 100,
            totalToday: 10
        })
    })
})
