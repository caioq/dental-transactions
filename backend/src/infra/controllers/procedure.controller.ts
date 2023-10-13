import { Body, Controller, Get, Post } from '@nestjs/common'
import { ProcedureService } from '../../domain/procedure/services/procedure.service'
import {
  CreateProcedureBodySchema,
  createProcedureBodySchema,
} from '../schemas/create-procedure.schema'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { Payment } from 'src/domain/procedure/entities/payment.entity'

const createProcedureBodyValidationPipe = new ZodValidationPipe(createProcedureBodySchema)

@Controller('procedures')
export class ProcedureController {
  constructor(private procedureService: ProcedureService) {}

  @Post()
  createProcedure(@Body(createProcedureBodyValidationPipe) body: CreateProcedureBodySchema) {
    return this.procedureService.createProcedure({
      ...body,
      // payments: body.payments,
      doctorId: '1',
    })
  }

  @Get()
  getProceduresByDoctorId() {
    return this.procedureService.getProceduresByDoctorId('1')
  }
}
