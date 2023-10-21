import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common'
import { ProcedureService } from '../../domain/procedure/services/procedure.service'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import {
  CreateProcedureBodySchema,
  createProcedureBodySchema,
  UpdateProcedureBodySchema,
  updateProcedureBodySchema,
} from '../schemas'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

const createProcedureBodyValidationPipe = new ZodValidationPipe(createProcedureBodySchema)
const updateProcedureBodyValidationPipe = new ZodValidationPipe(updateProcedureBodySchema)

@Controller('procedures')
export class ProcedureController {
  constructor(private procedureService: ProcedureService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createProcedure(@Body(createProcedureBodyValidationPipe) body: CreateProcedureBodySchema) {
    return this.procedureService.createProcedure({
      ...body,
      doctorId: '1',
    })
  }

  @Put()
  updateProcedure(@Body(updateProcedureBodyValidationPipe) body: UpdateProcedureBodySchema) {
    return this.procedureService.updateProcedure({
      ...body,
      doctorId: '1',
    })
  }

  @Get()
  getProceduresByDoctorId() {
    return this.procedureService.getProceduresByDoctorId('1')
  }
}
