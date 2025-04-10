import { IWsState } from '../types'
import { TWSUserActions } from '../actions/ws-user-orders'
import {
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_ERROR,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_GET_MESSAGE,
    USER_WS_CONNECTION_CONNECTING
} from '../constants/ws'

export const initialState: IWsState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
}

export const wsUserOrdersReducer = (state = initialState, action: TWSUserActions): IWsState => {
    switch (action.type) {
        case USER_WS_CONNECTION_CONNECTING:
            return {
                ...state,
                wsConnected: false
            }
        case USER_WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                error: undefined
            }
        case USER_WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload
            }
        case USER_WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                error: undefined
            }
        case USER_WS_GET_MESSAGE:
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
