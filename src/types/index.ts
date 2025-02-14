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

export interface RootState {
    ingredients: {
        items: IIngredient[]
        itemsRequest: boolean
        itemsFailed: boolean
    }
    burgerConstructor: {
        bun: IIngredient | null
        ingredients: Array<IIngredient & { uuid: string }>
    }
    order: {
        orderNumber: number | null
        orderRequest: boolean
        orderFailed: boolean
    }
    ingredientDetails: {
        item: IIngredient | null
    }
}
