import '@testing-library/cypress/add-commands'

// Пользовательская команда для перетаскивания элементов
Cypress.Commands.add('dragAndDrop', (dragSelector, dropSelector) => {
    cy.get(dragSelector)
        .trigger('dragstart')
        .get(dropSelector)
        .trigger('drop')
        .get(dragSelector)
        .trigger('dragend')
})

// Расширенная версия команды для перетаскивания ингредиентов в конструктор
Cypress.Commands.add('dragIngredientToConstructor', (ingredientName, targetSelector) => {
    cy.contains(ingredientName)
        .parent()
        .trigger('dragstart')
        .get(targetSelector)
        .trigger('drop')
        .wait(100) // Даем время для обработки события
})

// Команда для добавления ингредиента в конструктор
Cypress.Commands.add('addIngredientToConstructor', (ingredientName, isFillingOrBun = 'filling') => {
    const target = isFillingOrBun === 'bun' ? '[class*="bun"]' : '[class*="fillings"]'
    cy.dragIngredientToConstructor(ingredientName, target)
})

// Команда для удаления ингредиента из конструктора
Cypress.Commands.add('removeIngredientFromConstructor', (ingredientName) => {
    cy.get('[class*="item"]')
        .contains(ingredientName)
        .parent()
        .find('[class*="constructor-element__action"]')
        .click()
})

// Команда для создания бургера со стандартным набором ингредиентов
Cypress.Commands.add('createStandardBurger', () => {
    cy.addIngredientToConstructor('Краторная булка N-200i', 'bun')
    cy.addIngredientToConstructor('Филе Люминесцентного тетраодонтимформа')
    cy.addIngredientToConstructor('Соус Spicy-X')
})

// Команда для оформления заказа
Cypress.Commands.add('placeOrder', () => {
    cy.mockOrderCreation()
    cy.contains('Оформить заказ').click()
    cy.contains('идентификатор заказа').should('exist')
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

// Команда для проверки наличия счетчика на ингредиенте
Cypress.Commands.add('checkIngredientCounter', (ingredientName, expectedCount) => {
    cy.contains(ingredientName)
        .parent()
        .find('[class*="counter"]')
        .should(expectedCount ? 'exist' : 'not.exist')

    if (expectedCount) {
        cy.contains(ingredientName)
            .parent()
            .find('[class*="counter"]')
            .should('contain', expectedCount)
    }
})

// Команда для открытия и проверки модального окна с деталями ингредиента
Cypress.Commands.add('checkIngredientDetails', (ingredientName) => {
    cy.contains(ingredientName).click()
    cy.contains('Детали ингредиента').should('exist')
    cy.contains(ingredientName).should('exist')
    cy.contains('Белки, г').should('exist')
    cy.contains('Жиры, г').should('exist')
    cy.contains('Углеводы, г').should('exist')
    cy.contains('Калории,ккал').should('exist')
    return cy.get('button.closeButton, button[class*="closeButton"]')
})
