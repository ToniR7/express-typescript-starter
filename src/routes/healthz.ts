import { Router } from 'express'
import { healthzHandler } from '@/apis'
import { validateZodHandler } from '@/middlewares'
import { emptyLooseSchema, emptyStrictSchema } from '@/models/commonSchemas'

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
