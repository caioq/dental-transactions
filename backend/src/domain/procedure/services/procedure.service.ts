import { Injectable } from '@nestjs/common'
import { Procedure } from '../entities/procedure.entity'
import { ProcedureRepository } from '../repositories/procedure.repository'
import { Payment } from '../entities/payment.entity'

interface CreatePaymentParams extends Omit<Payment, 'id' | 'createdAt' | 'procedureId'> {}

interface CreateProcedureParams extends Omit<Procedure, 'id' | 'createdAt' | 'payments'> {
  payments: CreatePaymentParams[]
}

interface UpdatePaymentParams extends Omit<Payment, 'id' | 'createdAt'> {
  id?: string
}

interface UpdateProcedureParams extends Omit<Procedure, 'createdAt' | 'payments'> {
  payments: UpdatePaymentParams[]
}

@Injectable()
export class ProcedureService {
  constructor(private procedureRepository: ProcedureRepository) {}

  async createProcedure(params: CreateProcedureParams): Promise<Procedure> {
    const payments = params.payments.map((payment) => Payment.create(payment))
    const procedure = Procedure.create({ ...params, payments })

    return this.procedureRepository.create(procedure)
  }

  async updateProcedure(params: UpdateProcedureParams): Promise<Procedure> {
    const payments = params.payments?.map((payment) => Payment.create(payment))
    const procedure = Procedure.create({ ...params, payments })

    return this.procedureRepository.update(procedure)
  }

  async getProceduresByDoctorId(
    doctorId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Procedure[]> {
    const procedures = await this.procedureRepository.findByDoctorId(doctorId, {
      period: { start: startDate, end: endDate },
    })
    return procedures
  }
}
