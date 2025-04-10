import './commands'

// Отключаем сообщения об ошибках, связанных с веб-сокетами
Cypress.on('uncaught:exception', (err) => {
    // Возвращаем false для предотвращения падения теста
    if (err.message && err.message.includes('WebSocket')) {
        return false
    }
    // Для других ошибок проваливаем тест
    return true
})
