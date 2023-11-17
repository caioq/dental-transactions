import { Injectable } from '@nestjs/common'
import { Payment } from '../entities/payment.entity'
import { PaymentRepository } from '../repositories/payment.repository'

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async getPaymentsByDoctorId(
    doctorId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Payment[]> {
    const payments = await this.paymentRepository.findByDoctorId(doctorId, {
      period: { start: startDate, end: endDate },
    })
    return payments
  }
}
