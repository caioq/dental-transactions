import { z } from 'zod'

const procedure = z.object({
  date: z.coerce.date(),
  patientName: z.string().min(1).max(255).nullable(),
  cpf: z.string().nullable(),
  category: z.string(),
  billing: z.number(),
  invoice: z.number(),
  payments: z.array(
    z.object({
      date: z.coerce.date(),
      value: z.number(),
    }),
  ),
  // payment: z.number().nullable(),
})

export const createProcedureBodySchema = procedure.required({
  date: true,
  category: true,
  billing: true,
})

export type CreateProcedureBodySchema = z.infer<typeof createProcedureBodySchema>
