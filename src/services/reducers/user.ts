import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
} from '../constants'

interface IUser {
    name: string
    email: string
}

interface IUserState {
    user: IUser | null
    isAuth: boolean
    registerRequest: boolean
    registerFailed: boolean
    loginRequest: boolean
    loginFailed: boolean
    logoutRequest: boolean
    logoutFailed: boolean
    getUserRequest: boolean
    getUserFailed: boolean
    updateUserRequest: boolean
    updateUserFailed: boolean
}

const initialState: IUserState = {
    user: null,
    isAuth: false,
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    getUserRequest: false,
    getUserFailed: false,
    updateUserRequest: false,
    updateUserFailed: false
}

export const userReducer = (state = initialState, action: any): IUserState => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                user: action.payload,
                isAuth: true
            }
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
            }
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                user: action.payload,
                isAuth: true
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            }
        }

        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...initialState
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            }
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                user: action.payload,
                isAuth: true
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true
            }
        }

        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                user: action.payload
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true
            }
        }

        default: {
            return state
        }
    }
}