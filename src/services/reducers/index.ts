import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { burgerConstructorReducer } from './burger-constructor'
import { ingredientDetailsReducer } from './ingredient-details'
import { orderReducer } from './order'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer
})
