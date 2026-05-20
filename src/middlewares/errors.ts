import type { NextFunction, Request, Response } from 'express'
import type { ApiResponse } from '#/models/responses.ts'

import { StatusCodes } from 'http-status-codes'
import { ApiError } from '#/errors/apiError.ts'
import { logger } from '#/logger/logger.ts'

export const errorsMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof ApiError) {
    const { message, statusCode, params, logMessage, logging } = err
    if (logging) {
      logger.error({ message: logMessage })
    }
    const response: ApiResponse = {
      message,
      params,
    }
    res.status(statusCode).json(response)
    return
  }

  logger.error({ message: err.message, stack: err.stack })
  const response: ApiResponse = {
    message: 'unexpected-error',
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
}
