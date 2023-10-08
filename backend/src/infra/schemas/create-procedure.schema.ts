import { z } from 'zod'

const procedure = z.object({
  date: z.coerce.date(),
  patientName: z.string().min(3).max(255).nullable(),
  cpf: z.string().nullable(),
  category: z.string(),
  value: z.number(),
  toReceiveValue: z.number(),
  paidValue: z.number().nullable(),
})

export const createProcedureBodySchema = procedure.required({
  date: true,
  category: true,
  value: true,
})

export type CreateProcedureBodySchema = z.infer<typeof createProcedureBodySchema>
