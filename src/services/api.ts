import axios from 'axios'
import { IIngredient } from '../types'

const API_URL = 'https://norma.nomoreparties.space/api'

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

export const ingredientsApi = {
    getIngredients: () =>
        api.get<ApiResponse<IIngredient[]>>('/ingredients')
            .then(res => {
                if (res.data.success) {
                    return res.data;
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
}
