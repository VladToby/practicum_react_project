import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { burgerConstructorReducer } from './burger-constructor'
import { ingredientDetailsReducer } from './ingredient-details'
import { orderReducer } from './order'
import { userReducer } from './user'
import { wsOrdersReducer } from './ws-orders'
import { wsUserOrdersReducer } from './ws-user-orders'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    user: userReducer,
    wsOrders: wsOrdersReducer,
    wsUserOrders: wsUserOrdersReducer
})
