import { request } from '../utils/api'

export const ingredientsApi = {
    getIngredients: () => request('ingredients')
}

export const orderApi = {
    createOrder: (ingredients: string[]) =>
        request('orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        })
}
