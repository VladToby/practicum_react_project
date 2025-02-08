import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from '../constants'
import { Action } from 'redux'
import { IIngredient, IConstructorIngredient } from '../types'
import { v4 as uuidv4 } from 'uuid'

export interface IAddIngredientAction {
    type: typeof ADD_INGREDIENT
    payload: IIngredient | IConstructorIngredient
}

export interface IRemoveIngredientAction extends Action {
    type: typeof REMOVE_INGREDIENT
    payload: string
}

export interface IMoveIngredientAction extends Action {
    type: typeof MOVE_INGREDIENT
    payload: {
        dragIndex: number
        hoverIndex: number
    }
}

export interface IClearConstructorAction extends Action {
    type: typeof CLEAR_CONSTRUCTOR
}

export type TConstructorActions =
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IMoveIngredientAction
    | IClearConstructorAction

export const addIngredient = (item: IIngredient): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    payload: item.type === 'bun' ? item : { ...item, uuid: uuidv4() }
})

export const removeIngredient = (uuid: string): IRemoveIngredientAction => ({
    type: REMOVE_INGREDIENT,
    payload: uuid
})

export const moveIngredient = (dragIndex: number, hoverIndex: number): IMoveIngredientAction => ({
    type: MOVE_INGREDIENT,
    payload: { dragIndex, hoverIndex }
})

export const clearConstructor = (): IClearConstructorAction => ({
    type: CLEAR_CONSTRUCTOR
})
