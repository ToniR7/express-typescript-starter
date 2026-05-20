import { z } from 'zod'

export const emptyStrictSchema = z.strictObject({}).meta({
  description: 'Empty object with strict validation',
  id: 'EmptyStrict',
})

export const emptyLooseSchema = z.looseObject({}).meta({
  description: 'Empty object with loose validation',
  id: 'EmptyLoose',
})

export type EmptyStrict = z.infer<typeof emptyStrictSchema>
export type EmptyLoose = z.infer<typeof emptyLooseSchema>
