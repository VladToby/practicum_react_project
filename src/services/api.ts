import axios from 'axios'
import { IIngredient } from '../types'

export const API_URL = 'https://norma.nomoreparties.space/api'

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export interface ApiResponse<T> {
    success: boolean
    data: T
}

export interface OrderResponse {
    success: boolean
    order: {
        number: number
    }
}

export const ingredientsApi = {
    getIngredients: () =>
        api.get<ApiResponse<IIngredient[]>>('/ingredients')
            .then(res => {
                if (res.data.success) {
                    return res.data
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
}

export const orderApi = {
    createOrder: (ingredients: string[]) =>
        api.post<OrderResponse>('/orders', { ingredients })
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    return res.data
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
}
