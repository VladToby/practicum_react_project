import { describe, it, expect } from 'vitest'
import { ingredientsReducer, initialState } from '../ingredients'
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../../constants'

describe('ingredients reducer', () => {
    it('должен вернуть начальное состояние', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('должен обработать GET_INGREDIENTS_REQUEST', () => {
        const action = {
            type: GET_INGREDIENTS_REQUEST
        }

        const newState = ingredientsReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            itemsRequest: true
        })
    })

    it('должен обработать GET_INGREDIENTS_SUCCESS', () => {
        const ingredients = [
            { _id: '1', name: 'Ингредиент 1' },
            { _id: '2', name: 'Ингредиент 2' }
        ]

        const action = {
            type: GET_INGREDIENTS_SUCCESS,
            payload: ingredients
        }

        const newState = ingredientsReducer({
            ...initialState,
            itemsRequest: true
        }, action)

        expect(newState).toEqual({
            ...initialState,
            items: ingredients,
            itemsRequest: false,
            itemsFailed: false
        })
    })

    it('должен обработать GET_INGREDIENTS_FAILED', () => {
        const action = {
            type: GET_INGREDIENTS_FAILED
        }

        const newState = ingredientsReducer({
            ...initialState,
            itemsRequest: true
        }, action)

        expect(newState).toEqual({
            ...initialState,
            itemsRequest: false,
            itemsFailed: true
        })
    })
})
