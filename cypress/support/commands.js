import '@testing-library/cypress/add-commands'

// Пользовательская команда для перетаскивания элементов
Cypress.Commands.add('dragAndDrop', (dragSelector, dropSelector) => {
    cy.get(dragSelector)
        .trigger('dragstart')
        .get(dropSelector)
        .trigger('drop')
})

// Пользовательская команда для имитации авторизации
Cypress.Commands.add('mockAuth', () => {
    // Устанавливаем токены
    window.localStorage.setItem('accessToken', 'Bearer test-access-token')
    window.localStorage.setItem('refreshToken', 'test-refresh-token')

    // Мокируем запросы авторизации
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser')
})

// Пользовательская команда для мокирования загрузки ингредиентов
Cypress.Commands.add('mockIngredients', () => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients')
})

// Пользовательская команда для мокирования создания заказа
Cypress.Commands.add('mockOrderCreation', () => {
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder')
})
