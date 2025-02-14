import { createStore, applyMiddleware, Action, Dispatch } from 'redux'
import { thunk, ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { rootReducer } from './reducers'
import { RootState } from './types'

const enhancer = composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<RootState, Action>)
)

//@ts-ignore
export const store = createStore(rootReducer, enhancer)

export type AppDispatch = Dispatch<Action> & typeof store.dispatch
