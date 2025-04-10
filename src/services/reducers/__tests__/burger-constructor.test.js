import { describe, it, expect, beforeEach, vi } from 'vitest'
import { burgerConstructorReducer, initialState } from '../burger-constructor'
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR
} from '../../constants'

// Мокируем uuid для предсказуемости тестов
vi.mock('uuid', () => ({
    v4: () => 'test-uuid'
}))

describe('burger-constructor reducer', () => {
    let bunMock
    let sauceMock
    let mainMock

    beforeEach(() => {
        // Сбрасываем localStorage перед каждым тестом
        localStorage.clear()

        bunMock = {
            _id: '60d3b41abdacab0026a733c6',
            name: 'Булка',
            type: 'bun',
            price: 100,
            image: 'bun.png'
        }

        sauceMock = {
            _id: '60d3b41abdacab0026a733c8',
            name: 'Соус',
            type: 'sauce',
            price: 50,
            image: 'sauce.png',
            uuid: 'test-uuid'
        }

        mainMock = {
            _id: '60d3b41abdacab0026a733c9',
            name: 'Начинка',
            type: 'main',
            price: 150,
            image: 'main.png',
            uuid: 'test-uuid'
        }
    })

    it('должен вернуть начальное состояние', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
    })

    it('должен обработать ADD_INGREDIENT для булки', () => {
        const action = {
            type: ADD_INGREDIENT,
            payload: bunMock
        }

        const newState = burgerConstructorReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            bun: bunMock
        })
    })

    it('должен обработать ADD_INGREDIENT для начинки', () => {
        const action = {
            type: ADD_INGREDIENT,
            payload: { ...sauceMock }
        }

        const newState = burgerConstructorReducer(initialState, action)

        expect(newState).toEqual({
            ...initialState,
            ingredients: [{ ...sauceMock }]
        })
    })

    it('должен обработать REMOVE_INGREDIENT', () => {
        const stateWithIngredient = {
            ...initialState,
            ingredients: [{ ...sauceMock, uuid: 'test-uuid' }]
        }

        const action = {
            type: REMOVE_INGREDIENT,
            payload: 'test-uuid'
        }

        const newState = burgerConstructorReducer(stateWithIngredient, action)

        expect(newState).toEqual({
            ...initialState,
            ingredients: []
        })
    })

    it('должен обработать MOVE_INGREDIENT', () => {
        const stateWithIngredients = {
            ...initialState,
            ingredients: [
                { ...sauceMock, uuid: 'uuid-1' },
                { ...mainMock, uuid: 'uuid-2' }
            ]
        }

        const action = {
            type: MOVE_INGREDIENT,
            payload: {
                dragIndex: 0,
                hoverIndex: 1
            }
        }

        const newState = burgerConstructorReducer(stateWithIngredients, action)

        expect(newState).toEqual({
            ...initialState,
            ingredients: [
                { ...mainMock, uuid: 'uuid-2' },
                { ...sauceMock, uuid: 'uuid-1' }
            ]
        })
    })

    it('должен обработать CLEAR_CONSTRUCTOR', () => {
        const stateWithData = {
            bun: bunMock,
            ingredients: [{ ...sauceMock, uuid: 'test-uuid' }]
        }

        const action = {
            type: CLEAR_CONSTRUCTOR
        }

        const newState = burgerConstructorReducer(stateWithData, action)

        expect(newState).toEqual(initialState)
    })
})
