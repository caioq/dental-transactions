import { z } from 'zod'

export const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
})

export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>
