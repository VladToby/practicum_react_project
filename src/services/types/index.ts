import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit"
import { Action } from 'redux'

export type AppDispatch = ThunkDispatch<RootState, unknown, Action>

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export interface IIngredient {
    _id: string
    name: string
    type: 'bun' | 'sauce' | 'main'
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
}

export interface IConstructorIngredient extends IIngredient {
    uuid: string
}

export interface IUser {
    name: string
    email: string
}

export interface IConstructorState {
    bun: IIngredient | null
    ingredients: Array<IIngredient & { uuid: string }>
}

export interface IIngredientDetailsState {
    item: IIngredient | null
}

export interface IOrderState {
    orderNumber: number | null
    orderRequest: boolean
    orderFailed: boolean
}

export interface IIngredientsState {
    items: IIngredient[]
    itemsRequest: boolean
    itemsFailed: boolean
}

export interface IUserState {
    user: IUser | null
    isAuth: boolean
    registerRequest: boolean
    registerFailed: boolean
    loginRequest: boolean
    loginFailed: boolean
    logoutRequest: boolean
    logoutFailed: boolean
    getUserRequest: boolean
    getUserFailed: boolean
    updateUserRequest: boolean
    updateUserFailed: boolean
}

export interface RootState {
    ingredients: IIngredientsState
    burgerConstructor: IConstructorState
    order: IOrderState
    ingredientDetails: IIngredientDetailsState
    user: IUserState
}
