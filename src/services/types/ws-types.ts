import { IIngredient } from '.'

export interface IWsState {
    wsConnected: boolean
    orders: IOrder[]
    total: number
    totalToday: number
    error?: Event
}

export interface IOrder {
    _id: string
    number: number
    name: string
    status: 'created' | 'pending' | 'done' | 'canceled'
    ingredients: string[]
    createdAt: string
    updatedAt: string
}

export interface IOrdersResponse {
    success: boolean
    orders: IOrder[]
    total: number
    totalToday: number
}

export interface IOrderWithIngredients extends IOrder {
    ingredientsData: IIngredient[]
    price: number
}
