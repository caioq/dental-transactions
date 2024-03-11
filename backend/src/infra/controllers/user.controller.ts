import { Body, Controller, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { createUserBodySchema, CreateUserBodySchema } from '../schemas'
import { UserService } from '../../domain/procedure/services'

const createUserBodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body(createUserBodyValidationPipe) body: CreateUserBodySchema) {
    const { email, password, name } = body

    await this.userService.createUser({ email, name, password })

    return { email, name }
  }
}
