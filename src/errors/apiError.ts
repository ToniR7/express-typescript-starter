import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes'

type ApiErrorOptions = {
  message: string
  params?: Record<string, unknown>
  logMessage?: string
  logging?: boolean
}

type ApiErrorConstructorOptions = ApiErrorOptions & { statusCode: StatusCodes }

export class ApiError extends Error {
  readonly statusCode: StatusCodes
  readonly params?: Record<string, unknown>
  readonly logMessage: string
  readonly logging: boolean

  private constructor(options: ApiErrorConstructorOptions) {
    const { message, statusCode, params, logMessage = getReasonPhrase(statusCode), logging = true } = options

    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.params = params
    this.logMessage = logMessage
    this.logging = logging
  }

  private static create(statusCode: StatusCodes, defaultLogMessage: ReasonPhrases, options: ApiErrorOptions): ApiError {
    const { message, params, logMessage = defaultLogMessage, logging = true } = options
    return new ApiError({ message, statusCode, params, logMessage, logging })
  }

  static badGatewayError(options: ApiErrorOptions): ApiError {
    return ApiError.create(StatusCodes.BAD_GATEWAY, ReasonPhrases.BAD_GATEWAY, options)
  }

  static badRequestError(options: ApiErrorOptions): ApiError {
    return ApiError.create(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, options)
  }

  static conflictError(options: ApiErrorOptions): ApiError {
    return ApiError.create(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT, options)
  }

  static forbiddenError(options: ApiErrorOptions): ApiError {
    return ApiError.create(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN, options)
  }

  static internalServerError(options: ApiErrorOptions): ApiError {
    return ApiError.create(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, options)
  }

  static notFoundError(options: ApiErrorOptions): ApiError {
    return ApiError.create(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, options)
  }

  static unauthorizedError(options: ApiErrorOptions): ApiError {
    return ApiError.create(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, options)
  }

  static unprocessableEntityError(options: ApiErrorOptions): ApiError {
    return ApiError.create(StatusCodes.UNPROCESSABLE_ENTITY, ReasonPhrases.UNPROCESSABLE_ENTITY, options)
  }
}
