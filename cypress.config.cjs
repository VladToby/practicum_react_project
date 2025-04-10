const { defineConfig } = require("cypress")

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        setupNodeEvents(on, config) {
            // Пользовательская настройка событий
        },
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        viewportWidth: 1440,
        viewportHeight: 900,
    },
})
