import { z } from "zod";

const signInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignInFormInputs = z.infer<typeof signInFormSchema>;
