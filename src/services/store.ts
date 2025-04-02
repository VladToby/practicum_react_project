import { createStore, applyMiddleware, Action } from 'redux'
import { thunk, ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { rootReducer } from './reducers'
import { RootState } from './types'
import { socketMiddleware } from './middleware/socket-middleware'
import { wsActions } from './actions/ws-orders'
import { wsUserActions } from './actions/ws-user-orders'

const wsMiddleware = socketMiddleware(wsActions)
const wsUserMiddleware = socketMiddleware(wsUserActions)

const enhancer = composeWithDevTools(
    applyMiddleware(
        thunk as ThunkMiddleware<RootState, Action>,
        wsMiddleware,
        wsUserMiddleware
    )
)

//@ts-ignore
export const store = createStore(rootReducer, enhancer)
