import { z } from "zod";

const newProcedureFormSchema = z.object({
  date: z.date(),
  patientName: z.string().nullable(),
  cpf: z.string().nullable(),
  category: z.string().min(1),
  billing: z.number().positive(),
  invoice: z.number().positive(),
  payments: z
    .object({
      value: z.number().positive(),
      date: z.date(),
    })
    .array(),
});

export type NewProcedureFormInputs = z.infer<typeof newProcedureFormSchema>;
