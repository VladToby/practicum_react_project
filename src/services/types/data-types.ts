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
