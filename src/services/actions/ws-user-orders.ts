import { IOrdersResponse } from '../types'
import {
    USER_WS_CONNECTION_START,
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_ERROR,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_GET_MESSAGE,
    USER_WS_SEND_MESSAGE,
    USER_WS_CONNECTION_STOP,
    USER_WS_CONNECTION_CONNECTING
} from '../constants/ws'

export interface IWSUserConnectionStartAction {
    readonly type: typeof USER_WS_CONNECTION_START
    readonly payload: string
}

export interface IWSUserConnectionConnectingAction {
    readonly type: typeof USER_WS_CONNECTION_CONNECTING
}

export interface IWSUserConnectionSuccessAction {
    readonly type: typeof USER_WS_CONNECTION_SUCCESS
    readonly payload: Event
}

export interface IWSUserConnectionErrorAction {
    readonly type: typeof USER_WS_CONNECTION_ERROR
    readonly payload: Event
}

export interface IWSUserConnectionClosedAction {
    readonly type: typeof USER_WS_CONNECTION_CLOSED
    readonly payload: Event
}

export interface IWSUserGetMessageAction {
    readonly type: typeof USER_WS_GET_MESSAGE
    readonly payload: IOrdersResponse
}

export interface IWSUserSendMessageAction {
    readonly type: typeof USER_WS_SEND_MESSAGE
    readonly payload: { message: string }
}

export interface IWSUserConnectionStopAction {
    readonly type: typeof USER_WS_CONNECTION_STOP
}

export type TWSUserActions =
    | IWSUserConnectionStartAction
    | IWSUserConnectionConnectingAction
    | IWSUserConnectionSuccessAction
    | IWSUserConnectionErrorAction
    | IWSUserConnectionClosedAction
    | IWSUserGetMessageAction
    | IWSUserSendMessageAction
    | IWSUserConnectionStopAction

export const wsUserConnectionStart = (url: string): IWSUserConnectionStartAction => ({
    type: USER_WS_CONNECTION_START,
    payload: url
})

export const wsUserConnectionConnecting = (): IWSUserConnectionConnectingAction => ({
    type: USER_WS_CONNECTION_CONNECTING
})

export const wsUserConnectionSuccess = (event: Event): IWSUserConnectionSuccessAction => ({
    type: USER_WS_CONNECTION_SUCCESS,
    payload: event
})

export const wsUserConnectionError = (event: Event): IWSUserConnectionErrorAction => ({
    type: USER_WS_CONNECTION_ERROR,
    payload: event
})

export const wsUserConnectionClosed = (event: Event): IWSUserConnectionClosedAction => ({
    type: USER_WS_CONNECTION_CLOSED,
    payload: event
})

export const wsUserGetMessage = (message: IOrdersResponse): IWSUserGetMessageAction => ({
    type: USER_WS_GET_MESSAGE,
    payload: message
})

export const wsUserSendMessage = (message: { message: string }): IWSUserSendMessageAction => ({
    type: USER_WS_SEND_MESSAGE,
    payload: message
})

export const wsUserConnectionStop = (): IWSUserConnectionStopAction => ({
    type: USER_WS_CONNECTION_STOP
})

export const wsUserActions = {
    wsConnect: USER_WS_CONNECTION_START,
    wsDisconnect: USER_WS_CONNECTION_STOP,
    wsSendMessage: USER_WS_SEND_MESSAGE,
    wsConnecting: USER_WS_CONNECTION_CONNECTING,
    wsOpen: USER_WS_CONNECTION_SUCCESS,
    wsClose: USER_WS_CONNECTION_CLOSED,
    wsMessage: USER_WS_GET_MESSAGE,
    wsError: USER_WS_CONNECTION_ERROR
}
