import { Body, Controller, Logger, Post, Put, UseGuards } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UserPayload } from '../auth/jwt.strategy'
import { CurrentUser } from '../auth/current-user.decorator'
import {
  ChangePasswordBodySchema,
  changePasswordBodySchema,
  createUserBodySchema,
  CreateUserBodySchema,
} from '../schemas'
import { UserService } from '../../domain/procedure/services'

const createUserBodyValidationPipe = new ZodValidationPipe(createUserBodySchema)
const changePasswordBodyValidationPipe = new ZodValidationPipe(changePasswordBodySchema)

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body(createUserBodyValidationPipe) body: CreateUserBodySchema) {
    const { email, password, name } = body

    await this.userService.createUser({ email, name, password })

    return { email, name }
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @CurrentUser() user: UserPayload,
    @Body(changePasswordBodyValidationPipe) body: ChangePasswordBodySchema,
  ) {
    const { id } = user
    const { currentPassword, newPassword } = body

    this.logger.log(`Changing password for user ${id}`)

    await this.userService.changePassword({ id, currentPassword, newPassword })
  }
}
