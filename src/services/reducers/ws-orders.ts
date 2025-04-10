import { IWsState } from '../types'
import { TWSActions } from '../actions/ws-orders'
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_CONNECTING
} from '../constants/ws'

export const initialState: IWsState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
}

export const wsOrdersReducer = (state = initialState, action: TWSActions): IWsState => {
    switch (action.type) {
        case WS_CONNECTION_CONNECTING:
            return {
                ...state,
                wsConnected: false
            }
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                error: undefined
            }
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload
            }
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                error: undefined
            }
        case WS_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        default:
            return state
    }
}
