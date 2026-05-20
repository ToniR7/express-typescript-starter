import { z } from 'zod'

export const healthzResponseSchema = z.literal(['OK']).meta({
  description: 'Health check response indicating the server is operational',
  id: 'HealthzResponse',
})

export type HealthzResponse = z.infer<typeof healthzResponseSchema>
