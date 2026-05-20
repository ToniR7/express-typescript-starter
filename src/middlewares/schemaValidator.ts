import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { ZodError, ZodObject, core } from 'zod'
import type { ApiResponse } from '#/models/responses.ts'

import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { logger } from '#/logger/logger.ts'

type ZodStrictObject = ZodObject<core.$ZodShape>
type ZodLooseObject = ZodObject<core.$ZodLooseShape>

type ZodSchema = {
  headerSchema?: ZodLooseObject
  paramsSchema: ZodStrictObject
  querySchema: ZodStrictObject
  bodySchema: ZodStrictObject
}

export const validateZodHandler =
  (zodSchema: ZodSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { headers, params, query, body, baseUrl, path } = req
    const { headerSchema, paramsSchema, querySchema, bodySchema } = zodSchema

    const validationSteps = [
      {
        type: 'header',
        validate: (): ZodError | undefined => {
          if (!headerSchema) {
            return undefined
          }
          const { error } = headerSchema.safeParse(headers)
          return error
        },
      },
      {
        type: 'params',
        validate: (): ZodError | undefined => {
          const { error } = paramsSchema.safeParse(params)
          return error
        },
      },
      {
        type: 'query',
        validate: (): ZodError | undefined => {
          const { error } = querySchema.safeParse(query)
          return error
        },
      },
      {
        type: 'body',
        validate: (): ZodError | undefined => {
          const { success, data, error } = bodySchema.safeParse(body)
          if (success) {
            req.body = data
          }
          return error
        },
      },
    ]

    for (const { type, validate } of validationSteps) {
      const error = validate()
      if (error) {
        const errorResponse: ApiResponse = {
          message: `schema-error.invalid-${type}`,
          params: {
            path: baseUrl + path,
            errors: z.flattenError(error),
          },
        }

        res.status(StatusCodes.BAD_REQUEST).json(errorResponse)
        logger.error(errorResponse)
        return
      }
    }
    next()
  }
