import { z } from 'zod'

export const testHeaderSchema = z.looseObject({
  authorization: z.string(),
  role: z.enum(['admin', 'user']),
})

export const testParamsSchema = z.strictObject({})
export const testQuerySchema = z.strictObject({})
export const testBodySchema = z.strictObject({
  id: z.string(),
  name: z.string(),
})

export type TestHeader = z.infer<typeof testHeaderSchema>
export type TestParams = z.infer<typeof testParamsSchema>
export type TestQuery = z.infer<typeof testQuerySchema>
export type TestBody = z.infer<typeof testBodySchema>
