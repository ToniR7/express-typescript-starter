import type { Response } from 'express'
import type { HealthzResponse } from '#/models/apiSchemas/healthz.ts'
import type { EmptyStrict } from '#/models/commonSchemas.ts'
import type { TypedRequest } from '#/typings/express.d.ts'

import { StatusCodes } from 'http-status-codes'
import { logger } from '#/logger/logger.ts'

export const healthzHandler = async (_req: TypedRequest<EmptyStrict, EmptyStrict>, res: Response<HealthzResponse>): Promise<void> => {
  logger.debug('Server is healthy')
  res.sendStatus(StatusCodes.OK)
}
