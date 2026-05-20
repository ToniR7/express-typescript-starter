import type { LeveledLogMethod, Logger } from 'winston'

import { addColors, createLogger, format, transports } from 'winston'
import { envVariables } from '@/environment'

type CustomLogger = Logger & Record<keyof typeof customLevels.levels, LeveledLogMethod>

const { LOG_LEVEL } = envVariables

const customLevels = {
  levels: {
    crit: 0,
    error: 1,
    warn: 2,
    apiRequest: 3,
    apiResponse: 3,
    info: 4,
    debug: 5,
  },
  colors: {
    crit: 'red',
    error: 'red',
    warn: 'yellow',
    apiRequest: 'cyan',
    apiResponse: 'green',
    info: 'white',
    debug: 'gray',
  },
}

addColors(customLevels.colors)

const winstonLogger = createLogger({
  levels: customLevels.levels,
  level: LOG_LEVEL,
  format: format.combine(format.timestamp(), format.json(), format.colorize({ all: true })),
  transports: [new transports.Console()],
})

export const logger = winstonLogger as unknown as CustomLogger
