import type { NextFunction, Request, Response } from 'express'
import type { ApiResponse } from '@/models/responses'

import { StatusCodes } from 'http-status-codes'
import { ApiError } from '@/errors'
import { errorsMiddleware } from '@/middlewares'

describe('errorsMiddleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as unknown as Request
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response
    next = vi.fn() as NextFunction
  })

  const params = { field: 'username' }
  const logMessage = 'Custom log message'
  const logging = false

  describe('BadGatewayError', () => {
    const message = 'error.bad-request'

    it('should handle a generic BadGatewayError', () => {
      const err = ApiError.badGatewayError({ message })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_GATEWAY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle BadGatewayError with custom params', () => {
      const err = ApiError.badGatewayError({ message, params })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_GATEWAY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle BadGatewayError with custom logMessage', () => {
      const logMessage = 'Custom log message'
      const err = ApiError.badGatewayError({ message, logMessage })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_GATEWAY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle BadGatewayError with logging disabled', () => {
      const err = ApiError.badGatewayError({ message, logging })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_GATEWAY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle BadGatewayError with params, logMessage and logging disabled', () => {
      const err = ApiError.badGatewayError({ message, params, logMessage, logging })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_GATEWAY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('BadRequestError', () => {
    const message = 'error.bad-request'

    it('should handle a generic BadRequestError', () => {
      const err = ApiError.badRequestError({ message })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle BadRequestError with custom params', () => {
      const err = ApiError.badRequestError({ message, params })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle BadRequestError with custom logMessage', () => {
      const logMessage = 'Custom log message'
      const err = ApiError.badRequestError({ message, logMessage })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle BadRequestError with logging disabled', () => {
      const err = ApiError.badRequestError({ message, logging })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle BadRequestError with params, logMessage and logging disabled', () => {
      const err = ApiError.badRequestError({ message, params, logMessage, logging })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('ConflictError', () => {
    const message = 'error.conflict'

    it('should handle a generic ConflictError', () => {
      const err = ApiError.conflictError({ message })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle ConflictError with custom params', () => {
      const err = ApiError.conflictError({ message, params })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle ConflictError with custom logMessage', () => {
      const err = ApiError.conflictError({ message, logMessage })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle ConflictError with logging disabled', () => {
      const err = ApiError.conflictError({ message, logging })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle ConflictError with params, logMessage and logging disabled', () => {
      const err = ApiError.conflictError({ message, params, logMessage, logging })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('ForbiddenError', () => {
    const message = 'error.forbidden'

    it('should handle a generic ForbiddenError', () => {
      const err = ApiError.forbiddenError({ message })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle ForbiddenError with custom params', () => {
      const err = ApiError.forbiddenError({ message, params })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle ForbiddenError with custom logMessage', () => {
      const err = ApiError.forbiddenError({ message, logMessage })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle ForbiddenError with logging disabled', () => {
      const err = ApiError.forbiddenError({ message, logging })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle ForbiddenError with params, logMessage and logging disabled', () => {
      const err = ApiError.forbiddenError({ message, params, logMessage, logging })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('InternalServerError', () => {
    const message = 'error.internal-server'

    it('should handle a generic InternalServerError', () => {
      const err = ApiError.internalServerError({ message })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle InternalServerError with custom params', () => {
      const err = ApiError.internalServerError({ message, params })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle InternalServerError with custom logMessage', () => {
      const err = ApiError.internalServerError({ message, logMessage })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle InternalServerError with logging disabled', () => {
      const err = ApiError.internalServerError({ message, logging })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle InternalServerError with params, logMessage and logging disabled', () => {
      const err = ApiError.internalServerError({ message, params, logMessage, logging })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('NotFoundError', () => {
    const message = 'error.not-found'

    it('should handle a generic NotFoundError', () => {
      const err = ApiError.notFoundError({ message })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle NotFoundError with custom params', () => {
      const err = ApiError.notFoundError({ message, params })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle NotFoundError with custom logMessage', () => {
      const err = ApiError.notFoundError({ message, logMessage })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle NotFoundError with logging disabled', () => {
      const err = ApiError.notFoundError({ message, logging })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle NotFoundError with params, logMessage and logging disabled', () => {
      const err = ApiError.notFoundError({ message, params, logMessage, logging })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('UnauthorizedError', () => {
    const message = 'error.unauthorized'

    it('should handle a generic UnauthorizedError', () => {
      const err = ApiError.unauthorizedError({ message })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle UnauthorizedError with custom params', () => {
      const err = ApiError.unauthorizedError({ message, params })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle UnauthorizedError with custom logMessage', () => {
      const err = ApiError.unauthorizedError({ message, logMessage })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle UnauthorizedError with logging disabled', () => {
      const err = ApiError.unauthorizedError({ message, logging })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle UnauthorizedError with params, logMessage and logging disabled', () => {
      const err = ApiError.unauthorizedError({ message, params, logMessage, logging })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('UnprocessableEntityError', () => {
    const message = 'error.unprocessable-entity'

    it('should handle a generic UnprocessableEntityError', () => {
      const err = ApiError.unprocessableEntityError({ message })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle UnprocessableEntityError with custom params', () => {
      const err = ApiError.unprocessableEntityError({ message, params })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle UnprocessableEntityError with custom logMessage', () => {
      const err = ApiError.unprocessableEntityError({ message, logMessage })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle UnprocessableEntityError with logging disabled', () => {
      const err = ApiError.unprocessableEntityError({ message, logging })
      const response: ApiResponse = {
        message,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle UnprocessableEntityError with params, logMessage and logging disabled', () => {
      const err = ApiError.unprocessableEntityError({ message, params, logMessage, logging })
      const response: ApiResponse = {
        message,
        params,
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('UnhandledError', () => {
    it('should handle unhandled errors', () => {
      const err = new Error('Unhandled error')
      const response: ApiResponse = {
        message: 'unexpected-error',
      }

      errorsMiddleware(err, req, res, next)
      expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
      expect(res.json).toHaveBeenCalledWith(response)
      expect(next).not.toHaveBeenCalled()
    })
  })
})
