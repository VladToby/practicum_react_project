import { IIngredient, IUser, IOrder } from './data-types'

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
    currentOrder: any | null
    orderDetailsRequest: boolean
    orderDetailsFailed: boolean
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

export interface IWsState {
    wsConnected: boolean
    orders: IOrder[]
    total: number
    totalToday: number
    error?: Event
}

export interface IRootState {
    ingredients: IIngredientsState
    burgerConstructor: IConstructorState
    order: IOrderState
    ingredientDetails: IIngredientDetailsState
    user: IUserState
    wsOrders: IWsState
    wsUserOrders: IWsState
}
