import type { Express } from 'express'

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { apiRequestLogger, apiResponseLogger } from '#/logger/utils.ts'
import { authenticationMiddleware, bodyParserMiddleware, errorsMiddleware, rateLimiter } from '#/middlewares/index.ts'
import { healthzRouter } from '#/routes/index.ts'

export const setAppConfigurations = (app: Express): void => {
  app.use(helmet())
  app.use(cors())
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))
  app.use(rateLimiter)
  app.use(apiRequestLogger)
  app.use(apiResponseLogger)
}

export const setAppRoutes = (app: Express): void => {
  app.use(bodyParserMiddleware)
  app.use('/healthz', healthzRouter)
  app.use(authenticationMiddleware)
  app.use(errorsMiddleware)
}
