import type { LoggerOptions, Logger } from '@vroomly/utils'
import { createLogger } from '@vroomly/utils'

let loggerInstance: Logger | undefined

/**
 * Инициализирует логгер с опциями.
 * Вызывается один раз в entry-point (main.ts).
 */
export function initLogger(options: LoggerOptions): Logger {
    loggerInstance = createLogger('API', options)
    return loggerInstance
}

/**
 * Возвращает ранее инициализированный логгер.
 * Бросит ошибку, если initLogger ещё не вызван.
 */
export function getLogger(): Logger {
    if (!loggerInstance) {
        throw new Error(
            'Logger не инициализирован. Вызовите initLogger в main.ts.'
        )
    }
    return loggerInstance
}
