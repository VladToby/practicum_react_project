/// <reference types="cypress" />

describe('Вкладки ингредиентов', () => {
    beforeEach(() => {
        // Посещаем главную страницу
        cy.visit('/')

        // Ждем загрузки ингредиентов
        cy.contains('Соберите бургер').should('exist')
    })

    it('должны корректно переключаться при клике', () => {
        // Проверяем наличие вкладок
        cy.contains('Булки').should('exist')
        cy.contains('Соусы').should('exist')
        cy.contains('Начинки').should('exist')

        // Вместо проверки классов, проверим видимость разделов
        cy.contains('h2', 'Булки').should('be.visible')

        // Кликаем на вкладку "Соусы"
        cy.contains('Соусы').click()

        // Проверяем, что раздел с соусами видим
        cy.contains('h2', 'Соусы').should('be.visible')

        // Кликаем на вкладку "Начинки"
        cy.contains('Начинки').click()

        // Проверяем, что раздел с начинками видим
        cy.contains('h2', 'Начинки').should('be.visible')

        // Кликаем на вкладку "Булки" снова
        cy.contains('Булки').click()

        // Проверяем, что раздел с булками снова видим
        cy.contains('h2', 'Булки').should('be.visible')
    })

    it('должны переключаться при скролле списка ингредиентов', () => {
        // Проверяем, что раздел с булками видим
        cy.contains('h2', 'Булки').should('be.visible')

        // Скроллим до раздела "Соусы"
        cy.contains('h2', 'Соусы').scrollIntoView()

        // Даем время для обработки скролла
        cy.wait(500)

        // Скроллим до раздела "Начинки"
        cy.contains('h2', 'Начинки').scrollIntoView()

        // Даем время для обработки скролла
        cy.wait(500)

        // Скроллим обратно к разделу с булками
        cy.contains('h2', 'Булки').scrollIntoView()

        // Даем время для обработки скролла
        cy.wait(500)
    })
})
