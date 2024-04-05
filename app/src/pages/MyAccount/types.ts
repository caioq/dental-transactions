import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(3),
    newPassword: z.string().min(3),
    confirmNewPassword: z.string().min(3),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Senhas não são iguais",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormInputs = z.infer<typeof changePasswordFormSchema>;
