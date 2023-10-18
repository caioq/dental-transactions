import { Injectable } from '@nestjs/common'
import { Procedure } from '../entities/procedure.entity'
import { ProcedureRepository } from '../repositories/procedure.repository'
import { Payment } from '../entities/payment.entity'

interface PaymentParams extends Omit<Payment, 'id' | 'createdAt' | 'procedureId'> {}

interface CreateProcedureParams extends Omit<Procedure, 'id' | 'createdAt' | 'payments'> {
  payments: PaymentParams[]
}

@Injectable()
export class ProcedureService {
  constructor(private procedureRepository: ProcedureRepository) {}

  async createProcedure(params: CreateProcedureParams): Promise<Procedure> {
    const payments = params.payments.map((payment) => Payment.create(payment))
    const procedure = Procedure.create({ ...params, payments })

    return this.procedureRepository.create(procedure)
  }

  async getProceduresByDoctorId(doctorId: string): Promise<Procedure[]> {
    const procedures = await this.procedureRepository.findByDoctorId(doctorId)
    return procedures
  }
}
