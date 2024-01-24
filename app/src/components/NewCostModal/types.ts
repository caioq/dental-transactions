import { z } from "zod";

const newCostFormSchema = z.object({
  date: z.date(),
  description: z.string().nullable(),
  categoryId: z.string().min(1),
  value: z.number().positive(),
});

export type NewCostFormInputs = z.infer<typeof newCostFormSchema>;
