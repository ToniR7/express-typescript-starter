import type { Express } from 'express'
import type { Server } from 'node:http'

import express from 'express'
import { envVariables } from '@/environment'
import { logger } from '@/logger'
import { getIPv4Addresses, setAppConfigurations, setAppRoutes, shutdown } from '@/utils'

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
