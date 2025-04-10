import { ThunkAction, Action } from "@reduxjs/toolkit"
import { IRootState } from './state-types'

export * from './data-types'
export * from './state-types'

export type RootState = IRootState

export type AppDispatch = {
    <T extends Action>(action: T): T
    <ReturnType>(thunk: ThunkAction<ReturnType, RootState, unknown, Action>): ReturnType
}

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action
>
