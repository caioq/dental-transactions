import { z } from 'zod'

const cost = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  description: z.string().min(1).max(255).nullable(),
  categoryId: z.string(),
  value: z.number(),
  installments: z.number().default(1),
})

export const updateCostBodySchema = cost.required({
  date: true,
  category: true,
  value: true,
})

export type UpdateCostBodySchema = z.infer<typeof updateCostBodySchema>
