import { z } from 'zod'

export const apiResponseSchema = z
  .strictObject({
    message: z.string(),
    params: z.record(z.string(), z.unknown()).optional(),
  })
  .meta({
    description: 'Response schema for both success and error responses',
    id: 'Response',
  })

export type ApiResponse = z.infer<typeof apiResponseSchema>
