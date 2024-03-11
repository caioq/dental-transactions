import { Body, Controller, Get, Post, Put, Query, UseGuards, Logger } from '@nestjs/common'
import { ProcedureService } from '../../domain/procedure/services/procedure.service'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import {
  CreateProcedureBodySchema,
  createProcedureBodySchema,
  UpdateProcedureBodySchema,
  updateProcedureBodySchema,
} from '../schemas'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { UserPayload } from '../auth/jwt.strategy'

const createProcedureBodyValidationPipe = new ZodValidationPipe(createProcedureBodySchema)
const updateProcedureBodyValidationPipe = new ZodValidationPipe(updateProcedureBodySchema)

@Controller('procedures')
export class ProcedureController {
  private readonly logger = new Logger(ProcedureController.name)

  constructor(private procedureService: ProcedureService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createProcedure(
    @Body(createProcedureBodyValidationPipe) body: CreateProcedureBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { id } = user

    return this.procedureService.createProcedure({
      ...body,
      doctorId: id,
    })
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  updateProcedure(
    @Body(updateProcedureBodyValidationPipe) body: UpdateProcedureBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { id } = user

    return this.procedureService.updateProcedure({
      ...body,
      doctorId: id,
    })
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getProceduresByDoctorId(
    @CurrentUser() user: UserPayload,
    @Query('start_date') startDate: Date,
    @Query('end_date') endDate: Date,
  ) {
    const { id } = user

    this.logger.log(
      `Getting procedures for doctor ${id} with params startDate: ${startDate}, endDate: ${endDate}`,
    )

    return this.procedureService.getProceduresByDoctorId(id, new Date(startDate), new Date(endDate))
  }

  @Get('pending-payments')
  @UseGuards(JwtAuthGuard)
  getProceduresWithPendingPayments(@CurrentUser() user: UserPayload) {
    const { id } = user

    this.logger.log(`Getting procedures with pending payments for doctor ${id}`)

    return this.procedureService.getProceduresWithPendingPayments(id)
  }
}
