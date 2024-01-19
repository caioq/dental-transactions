import { z } from "zod";

const newCostFormSchema = z.object({
  date: z.date(),
  patientName: z.string().nullable(),
  cpf: z.string().nullable(),
  categoryId: z.string().min(1),
  billing: z.number().positive(),
  invoice: z.number().positive(),
});

export type NewCostFormInputs = z.infer<typeof newCostFormSchema>;
