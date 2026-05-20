import type { Express } from 'express'
import type { Server } from 'node:http'

import express from 'express'
import { envVariables } from '#/environment/index.ts'
import { logger } from '#/logger/logger.ts'
import { getIPv4Addresses, setAppConfigurations, setAppRoutes, shutdown } from '#/utils/index.ts'

const initServer = (app: Express): void => {
  const { PORT } = envVariables

  const server: Server = app.listen(PORT, () => {
    for (const ipv4 of getIPv4Addresses()) {
      logger.info(`Server listening at: http://${ipv4}:${PORT}`)
    }
  })

  process.on('SIGINT', async () => shutdown(server))
  process.on('SIGTERM', async () => shutdown(server))
}

const startApp = (): void => {
  const app = express()

  setAppConfigurations(app)
  setAppRoutes(app)
  initServer(app)
}

startApp()
