import { describe, it, expect } from 'vitest'
import { ingredientDetailsReducer } from '../ingredient-details'
import {
    SET_INGREDIENT_DETAILS,
    CLEAR_INGREDIENT_DETAILS
} from '../../constants'

describe('ingredient-details reducer', () => {
    const initialState = {
        item: null
    }

    it('должен вернуть начальное состояние', () => {
        expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState)
    })

    it('должен обработать SET_INGREDIENT_DETAILS', () => {
        const ingredient = {
            _id: '60d3b41abdacab0026a733c6',
            name: 'Ингредиент',
            type: 'main',
            proteins: 10,
            fat: 5,
            carbohydrates: 15,
            calories: 200,
            price: 100,
            image: 'image.png',
            image_mobile: 'image_mobile.png',
            image_large: 'image_large.png'
        }

        const action = {
            type: SET_INGREDIENT_DETAILS,
            payload: ingredient
        }

        const newState = ingredientDetailsReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            item: ingredient
        })
    })

    it('должен обработать CLEAR_INGREDIENT_DETAILS', () => {
        const stateWithIngredient = {
            item: {
                _id: '60d3b41abdacab0026a733c6',
                name: 'Ингредиент'
            }
        }

        const action = {
            type: CLEAR_INGREDIENT_DETAILS
        }

        const newState = ingredientDetailsReducer(stateWithIngredient, action)

        expect(newState).toEqual(initialState)
    })
})
