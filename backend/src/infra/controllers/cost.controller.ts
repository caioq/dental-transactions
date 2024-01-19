import { Body, Controller, Get, Post, Put, Query, UseGuards, Logger } from '@nestjs/common'
import { CostService } from '../../domain/procedure/services/cost.service'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CreateCostBodySchema, createCostBodySchema } from '../schemas'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { UserPayload } from '../auth/jwt.strategy'

const createCostBodyValidationPipe = new ZodValidationPipe(createCostBodySchema)
// const updateProcedureBodyValidationPipe = new ZodValidationPipe(updateProcedureBodySchema)

@Controller('costs')
export class CostController {
  private readonly logger = new Logger(CostController.name)

  constructor(private costService: CostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createCost(
    @Body(createCostBodyValidationPipe) body: CreateCostBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { id } = user

    return this.costService.createCost({
      ...body,
      doctorId: id,
    })
  }

  // @Put()
  // @UseGuards(JwtAuthGuard)
  // updateProcedure(
  //   @Body(updateProcedureBodyValidationPipe) body: UpdateProcedureBodySchema,
  //   @CurrentUser() user: UserPayload,
  // ) {
  //   const { id } = user

  //   return this.procedureService.updateProcedure({
  //     ...body,
  //     doctorId: id,
  //   })
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  getCostsByDoctorId(
    @CurrentUser() user: UserPayload,
    @Query('start_date') startDate: Date,
    @Query('end_date') endDate: Date,
  ) {
    const { id } = user

    this.logger.log(
      `Getting costs for doctor ${id} with params startDate: ${startDate}, endDate: ${endDate}`,
    )

    return this.costService.getCostByDoctorId(id, new Date(startDate), new Date(endDate))
  }
}
