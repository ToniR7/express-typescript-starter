import type { ZodOpenApiOperationObject } from 'zod-openapi'

import { StatusCodes } from 'http-status-codes'
import { healthzResponseSchema } from '@/models/apiSchemas/healthz'
import { emptyStrictSchema } from '@/models/commonSchemas'
import { INTERNAL_SERVER_ERROR_RESPONSE } from '@/openapi/fixtures'

export const healthzOperation: ZodOpenApiOperationObject = {
  operationId: 'getHealthz',
  summary: 'Health check endpoint',
  description: 'Returns the health status of the API server',
  tags: ['Healthz'],
  requestParams: {
    query: emptyStrictSchema,
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'Server is healthy and operational',
      content: {
        'text/plain': {
          schema: healthzResponseSchema,
        },
      },
    },
    ...INTERNAL_SERVER_ERROR_RESPONSE,
  },
}
