import type { Server } from 'node:http'

import { logger } from '@/logger'

export const shutdown = async (server: Server): Promise<never> => {
  logger.info('Shutdown signal received')
  try {
    server.close(() => logger.info('HTTP server closed'))
    process.exit(0)
  } catch (error) {
    logger.error('Error during shutdown:', error)
    process.exit(1)
  }
}
