/// <reference types="cypress" />

const SELECTORS = {
    CARD: '[class*="card"]',
    CONSTRUCTOR: '[class*="constructor"]',
    FILLINGS: '[class*="fillings"]',
    BUN: '[class*="bun"]',
    COUNTER: '[class*="counter"]',
    ITEM: '[class*="item"]',
    TOTAL: '[class*="total"]',
    CLOSE_BUTTON: 'button.closeButton, button[class*="closeButton"]',
    OVERLAY: 'div.overlay, div[class*="overlay"]',
    ORDER_NUMBER: '[class*="number"]'
};

describe('Страница "Конструктор"', () => {
    beforeEach(() => {
        // Мокируем запросы перед каждым тестом
        cy.mockIngredients();
        cy.mockAuth();

        // Посещаем главную страницу
        cy.visit('/');

        // Ждем загрузки ингредиентов
        cy.contains('Соберите бургер').should('exist');
    });

    it('должна отображать список ингредиентов', () => {
        // Проверяем наличие заголовков разделов
        cy.contains('Булки').should('exist');
        cy.contains('Соусы').should('exist');
        cy.contains('Начинки').should('exist');

        // Проверяем наличие ингредиентов
        cy.contains('Краторная булка N-200i').as('bunItem').should('exist');
        cy.contains('Соус Spicy-X').should('exist');
    });

    it('должна открывать модальное окно с деталями ингредиента при клике', () => {
        // Находим ингредиент и кликаем по нему
        cy.contains('Краторная булка N-200i').click();

        // Проверяем, что открылось модальное окно с деталями
        cy.contains('Детали ингредиента').should('exist');
        cy.contains('Краторная булка N-200i').should('exist');
        cy.contains('Белки, г').should('exist');
        cy.contains('Жиры, г').should('exist');
        cy.contains('Углеводы, г').should('exist');
        cy.contains('Калории,ккал').should('exist');

        // Закрываем модальное окно с помощью кнопки закрытия
        cy.get(SELECTORS.CLOSE_BUTTON).click();

        // Проверяем, что модальное окно закрылось
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('должна закрывать модальное окно при клике на кнопку закрытия', () => {
        // Открываем модальное окно с деталями ингредиента
        cy.contains('Краторная булка N-200i').click();

        // Проверяем, что модальное окно открылось
        cy.contains('Детали ингредиента').should('exist');

        // Находим кнопку закрытия и кликаем по ней
        cy.get(SELECTORS.CLOSE_BUTTON).click();

        // Проверяем, что модальное окно закрылось
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('должна закрывать модальное окно при нажатии на клавишу Escape', () => {
        // Открываем модальное окно с деталями ингредиента
        cy.contains('Краторная булка N-200i').click();

        // Проверяем, что модальное окно открылось
        cy.contains('Детали ингредиента').should('exist');

        // Нажимаем клавишу Escape
        cy.get('body').type('{esc}');

        // Проверяем, что модальное окно закрылось
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('должна закрывать модальное окно при клике на оверлей', () => {
        // Открываем модальное окно с деталями ингредиента
        cy.contains('Краторная булка N-200i').click();

        // Проверяем, что модальное окно открылось
        cy.contains('Детали ингредиента').should('exist');

        // Кликаем на оверлей (за пределами модального окна)
        cy.get(SELECTORS.OVERLAY).click({ force: true });

        // Проверяем, что модальное окно закрылось
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('должна позволять перетаскивать ингредиенты в конструктор', () => {
        // Используем ингредиенты в качестве алиасов
        cy.contains('Краторная булка N-200i').parent().as('bunElement');
        cy.contains('Филе Люминесцентного тетраодонтимформа').parent().as('fillingElement');

        // Эмулируем drag-n-drop для булки
        cy.get('@bunElement').trigger('dragstart');
        cy.get(SELECTORS.CONSTRUCTOR).trigger('drop');

        // Проверяем, что булка добавлена в конструктор
        cy.get(SELECTORS.BUN).contains('Краторная булка N-200i').should('exist');

        // Эмулируем drag-n-drop для начинки
        cy.get('@fillingElement').trigger('dragstart');
        cy.get(SELECTORS.FILLINGS).trigger('drop');

        // Проверяем, что начинка добавлена в конструктор
        cy.get(SELECTORS.FILLINGS).contains('Филе Люминесцентного тетраодонтимформа').should('exist');
    });

    it('должна корректно рассчитывать общую стоимость бургера', () => {
        // Используем нашу собственную команду для перетаскивания элементов
        cy.contains('Краторная булка N-200i').parent().as('bunElement');
        cy.contains('Филе Люминесцентного тетраодонтимформа').parent().as('fillingElement');

        // Эмулируем drag-n-drop для булки
        cy.get('@bunElement').trigger('dragstart');
        cy.get(SELECTORS.CONSTRUCTOR).trigger('drop');

        // Эмулируем drag-n-drop для начинки
        cy.get('@fillingElement').trigger('dragstart');
        cy.get(SELECTORS.FILLINGS).trigger('drop');

        // Проверяем итоговую стоимость (булка * 2 + начинка)
        // булка: 1255 * 2 = 2510, начинка: 988, итого: 3498
        cy.get(SELECTORS.TOTAL).contains('3498').should('exist');
    });

    it('должна позволять удалять ингредиенты из конструктора', () => {
        // Добавляем ингредиенты в конструктор
        cy.contains('Краторная булка N-200i').parent().as('bunElement');
        cy.contains('Филе Люминесцентного тетраодонтимформа').parent().as('fillingElement');

        // Эмулируем drag-n-drop для булки
        cy.get('@bunElement').trigger('dragstart');
        cy.get(SELECTORS.CONSTRUCTOR).trigger('drop');

        // Эмулируем drag-n-drop для начинки
        cy.get('@fillingElement').trigger('dragstart');
        cy.get(SELECTORS.FILLINGS).trigger('drop');

        // Проверяем, что начинка добавлена
        cy.get(SELECTORS.FILLINGS).contains('Филе Люминесцентного тетраодонтимформа').should('exist');

        // Находим кнопку удаления и кликаем по ней
        cy.get(SELECTORS.ITEM).contains('Филе Люминесцентного тетраодонтимформа')
            .parent().find('[class*="constructor-element__action"]').click();

        // Проверяем, что начинка удалена
        cy.get(SELECTORS.FILLINGS).contains('Филе Люминесцентного тетраодонтимформа').should('not.exist');
    });

    it('должна открывать модальное окно с деталями заказа при клике на кнопку "Оформить заказ"', () => {
        // Мокируем запрос создания заказа
        cy.mockOrderCreation();

        // Добавляем булку и начинку в конструктор используя нашу команду
        cy.contains('Краторная булка N-200i').parent().as('bunElement');
        cy.contains('Филе Люминесцентного тетраодонтимформа').parent().as('fillingElement');

        // Эмулируем drag-n-drop для булки
        cy.get('@bunElement').trigger('dragstart');
        cy.get(SELECTORS.CONSTRUCTOR).trigger('drop');

        // Эмулируем drag-n-drop для начинки
        cy.get('@fillingElement').trigger('dragstart');
        cy.get(SELECTORS.FILLINGS).trigger('drop');

        // Кликаем по кнопке "Оформить заказ"
        cy.contains('Оформить заказ').click();

        // Проверяем, что открылось модальное окно с номером заказа
        cy.contains('идентификатор заказа').should('exist');
        cy.get(SELECTORS.ORDER_NUMBER).contains('12345').should('exist');

        // Закрываем модальное окно
        cy.get(SELECTORS.CLOSE_BUTTON).click();

        // Проверяем, что модальное окно закрылось
        cy.contains('идентификатор заказа').should('not.exist');
    });

    it('должна отображать счетчик на карточке ингредиента при добавлении в конструктор', () => {
        // Добавляем булку в конструктор
        cy.contains('Краторная булка N-200i').parent().as('bunElement');
        cy.contains('Соус Spicy-X').parent().as('sauceElement');

        // Эмулируем drag-n-drop для булки
        cy.get('@bunElement').trigger('dragstart');
        cy.get(SELECTORS.CONSTRUCTOR).trigger('drop');

        // Проверяем, что на карточке булки появился счетчик с числом 2 (верх и низ бургера)
        cy.get('@bunElement').find(SELECTORS.COUNTER).should('exist');

        // Добавляем соус в конструктор
        cy.get('@sauceElement').trigger('dragstart');
        cy.get(SELECTORS.FILLINGS).trigger('drop');

        // Проверяем, что на карточке соуса появился счетчик
        cy.get('@sauceElement').find(SELECTORS.COUNTER).should('exist');
    });

    it('должна быть неактивная кнопка "Оформить заказ" если не добавлены ингредиенты', () => {
        // Проверяем, что кнопка "Оформить заказ" неактивна
        cy.contains('Оформить заказ').should('be.disabled');

        // Добавляем только булку
        cy.contains('Краторная булка N-200i').parent().as('bunElement');
        cy.contains('Филе Люминесцентного тетраодонтимформа').parent().as('fillingElement');

        // Эмулируем drag-n-drop для булки
        cy.get('@bunElement').trigger('dragstart');
        cy.get(SELECTORS.CONSTRUCTOR).trigger('drop');

        // Проверяем, что кнопка "Оформить заказ" все еще неактивна (нужна начинка)
        cy.contains('Оформить заказ').should('be.disabled');

        // Добавляем начинку
        cy.get('@fillingElement').trigger('dragstart');
        cy.get(SELECTORS.FILLINGS).trigger('drop');

        // Проверяем, что кнопка "Оформить заказ" стала активной
        cy.contains('Оформить заказ').should('not.be.disabled');
    });

    it('должна корректно отображать заказ после его оформления', () => {
        // Мокируем запрос создания заказа
        cy.mockOrderCreation();

        // Добавляем булку и начинку в конструктор
        cy.contains('Краторная булка N-200i').parent().as('bunElement');
        cy.contains('Филе Люминесцентного тетраодонтимформа').parent().as('fillingElement');

        // Эмулируем drag-n-drop для булки
        cy.get('@bunElement').trigger('dragstart');
        cy.get(SELECTORS.CONSTRUCTOR).trigger('drop');

        // Эмулируем drag-n-drop для начинки
        cy.get('@fillingElement').trigger('dragstart');
        cy.get(SELECTORS.FILLINGS).trigger('drop');

        // Кликаем по кнопке "Оформить заказ"
        cy.contains('Оформить заказ').click();

        // Проверяем, что открылось модальное окно с данными о заказе
        cy.contains('идентификатор заказа').should('exist');
        cy.get(SELECTORS.ORDER_NUMBER).contains('12345').should('exist');
        cy.contains('Ваш заказ начали готовить').should('exist');
        cy.contains('Дождитесь готовности на орбитальной станции').should('exist');

        // Закрываем модальное окно
        cy.get(SELECTORS.CLOSE_BUTTON).click();

        // Проверяем, что конструктор очистился после создания заказа
        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
    });
});
