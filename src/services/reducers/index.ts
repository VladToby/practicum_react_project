import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { burgerConstructorReducer } from './burger-constructor'
import { ingredientDetailsReducer } from './ingredient-details'
import { orderReducer } from './order'
import { userReducer } from './user'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    user: userReducer
})
