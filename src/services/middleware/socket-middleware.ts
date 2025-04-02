import { Middleware, AnyAction } from 'redux'
import { refreshToken } from '../../utils/api'

export type TwsActions = {
    wsConnect: string
    wsDisconnect: string
    wsSendMessage: string
    wsConnecting: string
    wsOpen: string
    wsClose: string
    wsMessage: string
    wsError: string
}

export const socketMiddleware = (wsActions: TwsActions): Middleware => {
    return store => {
        let socket: WebSocket | null = null
        let url = ''
        let isConnected = false
        let reconnectTimer: ReturnType<typeof setTimeout> | null = null

        return next => action => {
            const typedAction = action as AnyAction
            const { dispatch } = store
            const { type } = typedAction

            if (type === wsActions.wsConnect) {
                url = typedAction.payload

                if (socket) {
                    socket.close()
                }

                dispatch({ type: wsActions.wsConnecting })

                socket = new WebSocket(url)
                isConnected = true

                socket.onopen = event => {
                    dispatch({ type: wsActions.wsOpen, payload: event })
                }

                socket.onmessage = event => {
                    const { data } = event
                    const parsedData = JSON.parse(data)

                    if (parsedData.message === 'Invalid or missing token') {
                        refreshToken()
                            .then(success => {
                                if (success) {
                                    dispatch({ type: wsActions.wsConnect, payload: url })
                                }
                            })

                        return
                    }

                    dispatch({ type: wsActions.wsMessage, payload: parsedData })
                }

                socket.onclose = event => {
                    if (event.code !== 1000) {
                        dispatch({ type: wsActions.wsError, payload: event })
                    }

                    dispatch({ type: wsActions.wsClose, payload: event })

                    if (isConnected) {
                        reconnectTimer = setTimeout(() => {
                            dispatch({ type: wsActions.wsConnect, payload: url })
                        }, 3000)
                    }
                }

                socket.onerror = event => {
                    dispatch({ type: wsActions.wsError, payload: event })
                }
            }

            if (type === wsActions.wsDisconnect) {
                isConnected = false

                if (reconnectTimer) {
                    clearTimeout(reconnectTimer)
                    reconnectTimer = null
                }

                if (socket) {
                    socket.close(1000, 'Закрытие по команде клиента')
                    socket = null
                }
            }

            if (type === wsActions.wsSendMessage && socket) {
                const message = JSON.stringify(typedAction.payload)
                socket.send(message)
            }

            return next(action)
        }
    }
}
