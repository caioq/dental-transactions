import { Payment } from '../entities/payment.entity'

export interface PaymentFilter {
  period: {
    start: Date
    end: Date
  }
}

export abstract class PaymentRepository {
  abstract findByDoctorId(doctorId: string, filter?: PaymentFilter): Promise<Payment[]>
}
