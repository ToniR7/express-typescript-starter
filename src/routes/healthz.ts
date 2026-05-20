import { Router } from 'express'
import { healthzHandler } from '#/apis/index.ts'
import { validateZodHandler } from '#/middlewares/index.ts'
import { emptyLooseSchema, emptyStrictSchema } from '#/models/commonSchemas.ts'

export const healthzRouter: Router = Router()
healthzRouter.get(
  '/',
  validateZodHandler({
    headerSchema: emptyLooseSchema,
    paramsSchema: emptyStrictSchema,
    querySchema: emptyStrictSchema,
    bodySchema: emptyStrictSchema,
  }),
  healthzHandler,
)
