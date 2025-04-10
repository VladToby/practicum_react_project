import { IOrdersResponse } from '../types'
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CONNECTION_STOP,
    WS_CONNECTION_CONNECTING
} from '../constants/ws'

export interface IWSConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START
    readonly payload: string
}

export interface IWSConnectionConnectingAction {
    readonly type: typeof WS_CONNECTION_CONNECTING
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
    readonly payload: Event
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
    readonly payload: Event
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED
    readonly payload: Event
}

export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE
    readonly payload: IOrdersResponse
}

export interface IWSSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE
    readonly payload: { message: string }
}

export interface IWSConnectionStopAction {
    readonly type: typeof WS_CONNECTION_STOP
}

export type TWSActions =
    | IWSConnectionStartAction
    | IWSConnectionConnectingAction
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | IWSSendMessageAction
    | IWSConnectionStopAction

export const wsConnectionStart = (url: string): IWSConnectionStartAction => ({
    type: WS_CONNECTION_START,
    payload: url
})

export const wsConnectionConnecting = (): IWSConnectionConnectingAction => ({
    type: WS_CONNECTION_CONNECTING
})

export const wsConnectionSuccess = (event: Event): IWSConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS,
    payload: event
})

export const wsConnectionError = (event: Event): IWSConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR,
    payload: event
})

export const wsConnectionClosed = (event: Event): IWSConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED,
    payload: event
})

export const wsGetMessage = (message: IOrdersResponse): IWSGetMessageAction => ({
    type: WS_GET_MESSAGE,
    payload: message
})

export const wsSendMessage = (message: { message: string }): IWSSendMessageAction => ({
    type: WS_SEND_MESSAGE,
    payload: message
})

export const wsConnectionStop = (): IWSConnectionStopAction => ({
    type: WS_CONNECTION_STOP
})

export const wsActions = {
    wsConnect: WS_CONNECTION_START,
    wsDisconnect: WS_CONNECTION_STOP,
    wsSendMessage: WS_SEND_MESSAGE,
    wsConnecting: WS_CONNECTION_CONNECTING,
    wsOpen: WS_CONNECTION_SUCCESS,
    wsClose: WS_CONNECTION_CLOSED,
    wsMessage: WS_GET_MESSAGE,
    wsError: WS_CONNECTION_ERROR
}
