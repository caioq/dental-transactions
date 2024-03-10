import { z } from "zod";

const newCostFormSchema = z.object({
  date: z.date(),
  description: z.string().nullable(),
  categoryId: z.string().min(1),
  value: z.number().positive(),
  installments: z.number().int().positive().nullable(),
});

export type NewCostFormInputs = z.infer<typeof newCostFormSchema>;
