import { z } from 'zod'

export const changePasswordBodySchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
})

export type ChangePasswordBodySchema = z.infer<typeof changePasswordBodySchema>
