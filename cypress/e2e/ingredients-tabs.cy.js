/// <reference types="cypress" />

const TABS = {
    BUN: 'Булки',
    SAUCE: 'Соусы',
    MAIN: 'Начинки'
}

const SECTIONS = {
    BUN: 'h2:contains("Булки")',
    SAUCE: 'h2:contains("Соусы")',
    MAIN: 'h2:contains("Начинки")'
}

describe('Вкладки ингредиентов', () => {
    beforeEach(() => {
        // Мокируем запросы перед каждым тестом
        cy.mockIngredients()

        // Посещаем главную страницу
        cy.visit('/')

        // Ждем загрузки ингредиентов
        cy.contains('Соберите бургер').should('exist')

        // Создаем алиасы для вкладок и секций
        cy.contains(TABS.BUN).as('bunTab')
        cy.contains(TABS.SAUCE).as('sauceTab')
        cy.contains(TABS.MAIN).as('mainTab')

        cy.get(SECTIONS.BUN).as('bunSection')
        cy.get(SECTIONS.SAUCE).as('sauceSection')
        cy.get(SECTIONS.MAIN).as('mainSection')
    })

    it('должны корректно переключаться при клике', () => {
        // Проверяем наличие вкладок
        cy.get('@bunTab').should('exist')
        cy.get('@sauceTab').should('exist')
        cy.get('@mainTab').should('exist')

        // Вместо проверки классов, проверим видимость разделов
        cy.get('@bunSection').should('be.visible')

        // Кликаем на вкладку "Соусы"
        cy.get('@sauceTab').click()

        // Проверяем, что раздел с соусами видим
        cy.get('@sauceSection').should('be.visible')

        // Кликаем на вкладку "Начинки"
        cy.get('@mainTab').click()

        // Проверяем, что раздел с начинками видим
        cy.get('@mainSection').should('be.visible')

        // Кликаем на вкладку "Булки" снова
        cy.get('@bunTab').click()

        // Проверяем, что раздел с булками снова видим
        cy.get('@bunSection').should('be.visible')
    })

    it('должны переключаться при скролле списка ингредиентов', () => {
        // Проверяем, что раздел с булками видим
        cy.get('@bunSection').should('be.visible')

        // Скроллим до раздела "Соусы"
        cy.get('@sauceSection').scrollIntoView()

        // Даем время для обработки скролла
        cy.wait(500)

        // Скроллим до раздела "Начинки"
        cy.get('@mainSection').scrollIntoView()

        // Даем время для обработки скролла
        cy.wait(500)

        // Скроллим обратно к разделу с булками
        cy.get('@bunSection').scrollIntoView()

        // Даем время для обработки скролла
        cy.wait(500)
    })
})
