import { Body, Controller, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { AuthenticateBodySchema, authenticateBodySchema } from '../schemas/authenticate.schema'
import { AuthenticateService } from '../../domain/procedure/services/authenticate.service'

const authenticateBodyValidationPipe = new ZodValidationPipe(authenticateBodySchema)

@Controller('sessions')
export class AuthenticateController {
  constructor(private authenticateService: AuthenticateService) {}

  @Post()
  async authenticate(@Body(authenticateBodyValidationPipe) body: AuthenticateBodySchema) {
    const { email, password } = body

    const { accessToken, user } = await this.authenticateService.authenticate({ email, password })

    return { accessToken, user }
  }
}
