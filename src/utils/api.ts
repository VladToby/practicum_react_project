export const BASE_URL = "https://norma.nomoreparties.space/api"

export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

export const checkSuccess = (res: any) => {
    if (res && res.success) {
        return res
    }
    return Promise.reject(`Ответ не success: ${res}`)
}

export const getAccessToken = () => {
    const token = localStorage.getItem('accessToken')
    return token ? token.replace('Bearer ', '') : null
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
}

export const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
}

export const removeTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

export const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
}

export const request = (endpoint: string, options?: RequestInit) => {
    return fetch(`${BASE_URL}/${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}

export const authRequest = async (endpoint: string, options: RequestInit = {}) => {
    const accessToken = getAccessToken()

    if (!accessToken) {
        return Promise.reject('Отсутствует токен доступа')
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`
    }

    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            ...options,
            headers
        })

        const data = await response.json()

        if (!data.success) {
            if (data.message === 'jwt expired') {
                const refreshData = await refreshToken()
                return fetch(`${BASE_URL}/${endpoint}`, {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Authorization': `Bearer ${refreshData.accessToken}`
                    }
                })
                    .then(checkResponse)
                    .then(checkSuccess)
            }
            return Promise.reject(data)
        }

        return data
    } catch (error) {
        return Promise.reject(error)
    }
}

export const ingredientsApi = {
    getIngredients: () => request('ingredients')
}

export const orderApi = {
    createOrder: (ingredients: string[]) =>
        authRequest('orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        })
}

export const userApi = {
    register: (name: string, email: string, password: string) =>
        request('auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(data => {
                if (data.success) {
                    saveTokens(data.accessToken, data.refreshToken)
                }
                return data
            }),

    login: (email: string, password: string) =>
        request('auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(data => {
                if (data.success) {
                    saveTokens(data.accessToken, data.refreshToken)
                }
                return data
            }),

    logout: () => {
        const token = getRefreshToken()
        return request('auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        })
            .then(data => {
                if (data.success) {
                    removeTokens()
                }
                return data
            })
    },

    getUser: () =>
        authRequest('auth/user'),

    updateUser: (name: string, email: string, password?: string) => {
        const body: { name: string, email: string, password?: string } = { name, email }
        if (password) {
            body.password = password
        }
        return authRequest('auth/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    },

    forgotPassword: (email: string) =>
        request('password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }),

    resetPassword: (password: string, token: string) =>
        request('password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, token })
        })
}
