import type { ZodOpenApiResponsesObject } from 'zod-openapi'

import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { apiResponseSchema } from '@/models/responses'

const content = {
  'application/json': {
    schema: apiResponseSchema,
  },
}

export const BAD_REQUEST_RESPONSE: ZodOpenApiResponsesObject = {
  [StatusCodes.BAD_REQUEST]: {
    description: ReasonPhrases.BAD_REQUEST,
    content,
  },
}

export const CONFLICT_RESPONSE: ZodOpenApiResponsesObject = {
  [StatusCodes.CONFLICT]: {
    description: ReasonPhrases.CONFLICT,
    content,
  },
}

export const FORBIDDEN_RESPONSE: ZodOpenApiResponsesObject = {
  [StatusCodes.FORBIDDEN]: {
    description: ReasonPhrases.FORBIDDEN,
    content,
  },
}

export const INTERNAL_SERVER_ERROR_RESPONSE: ZodOpenApiResponsesObject = {
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    description: ReasonPhrases.INTERNAL_SERVER_ERROR,
    content,
  },
}

export const NOT_FOUND_RESPONSE: ZodOpenApiResponsesObject = {
  [StatusCodes.NOT_FOUND]: {
    description: ReasonPhrases.NOT_FOUND,
    content,
  },
}

export const UNAUTHORIZED_RESPONSE: ZodOpenApiResponsesObject = {
  [StatusCodes.UNAUTHORIZED]: {
    description: ReasonPhrases.UNAUTHORIZED,
    content,
  },
}

export const UNPROCESSABLE_ENTITY_RESPONSE: ZodOpenApiResponsesObject = {
  [StatusCodes.UNPROCESSABLE_ENTITY]: {
    description: ReasonPhrases.UNPROCESSABLE_ENTITY,
    content,
  },
}
