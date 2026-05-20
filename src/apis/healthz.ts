import type { Response } from 'express'
import type { HealthzResponse } from '@/models/apiSchemas/healthz'
import type { EmptyStrict } from '@/models/commonSchemas'
import type { TypedRequest } from '@/typings/express'

import { StatusCodes } from 'http-status-codes'
import { logger } from '@/logger'

export const healthzHandler = async (_req: TypedRequest<EmptyStrict, EmptyStrict>, res: Response<HealthzResponse>): Promise<void> => {
  logger.debug('Server is healthy')
  res.sendStatus(StatusCodes.OK)
}
