import { z } from 'zod'

const cost = z.object({
  date: z.coerce.date(),
  description: z.string().min(1).max(255).nullable(),
  categoryId: z.string(),
  value: z.number(),
  installments: z.number().default(1),
})

export const createCostBodySchema = cost.required({
  date: true,
  category: true,
  value: true,
})

export type CreateCostBodySchema = z.infer<typeof createCostBodySchema>
