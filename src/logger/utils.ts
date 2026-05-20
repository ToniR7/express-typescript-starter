import type { Request } from 'express'

import morgan from 'morgan'
import { logger } from '@/logger'

export const apiRequestLogger = morgan(':method :url', {
  immediate: true,
  stream: {
    write: (message) => logger.apiRequest(message.trim()),
  },
  skip: (req: Request) => req.originalUrl.startsWith('/healthz'),
})

export const apiResponseLogger = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: {
    write: (message) => logger.apiResponse(message.trim()),
  },
  skip: (req: Request) => req.originalUrl.startsWith('/healthz'),
})
