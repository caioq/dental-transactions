import { z } from 'zod'

const procedure = z.object({
  id: z.string().uuid(),
  date: z.coerce.date(),
  patientName: z.string().min(1).max(255).nullable(),
  cpf: z.string().nullable(),
  categoryId: z.string(),
  billing: z.number(),
  invoice: z.number(),
  payments: z.array(
    z.object({
      id: z.string().uuid().optional(),
      date: z.coerce.date(),
      value: z.number(),
    }),
  ),
})

export const updateProcedureBodySchema = procedure.required({
  date: true,
  category: true,
  billing: true,
})

export type UpdateProcedureBodySchema = z.infer<typeof updateProcedureBodySchema>
