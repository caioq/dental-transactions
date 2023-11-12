import { Injectable, NotFoundException } from '@nestjs/common'
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
    const currentProcedure = await this.procedureRepository.findById(params.id)
    if (!currentProcedure) throw new NotFoundException('Procedure not found')

    const newPayments = params.payments.flatMap((payment) => {
      if (!payment.id) return Payment.create(payment)

      return []
    })
    const currentPayments = currentProcedure.payments || []
    const payments = currentPayments.map((currentPayment) => {
      const payment = params.payments.find((p) => p.id === currentPayment.id)
      if (payment) return Payment.create(payment)

      return Payment.create({ ...currentPayment, deletedAt: new Date() })
    })
    const procedure = Procedure.create({ ...params, payments: [...payments, ...newPayments] })

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
