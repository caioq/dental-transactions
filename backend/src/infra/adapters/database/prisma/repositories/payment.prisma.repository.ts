import { Injectable } from '@nestjs/common'
import {
  PaymentFilter,
  PaymentRepository,
} from '../../../../../domain/procedure/repositories/payment.repository'
import { PrismaService } from '../prisma.service'
import { PaymentPrismaMapper } from '../mappers/payment.prisma.mapper'
import { Payment } from '../../../../../domain/procedure/entities/payment.entity'

@Injectable()
export class PaymentPrismaRepository implements PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async findByDoctorId(doctorId: string, filter: PaymentFilter): Promise<Payment[]> {
    const { period } = filter

    const payments = await this.prisma.payment.findMany({
      where: {
        procedure: {
          doctorId,
        },
        ...(period && { date: { gte: period.start, lte: period.end } }),
        deletedAt: null,
      },
      include: { procedure: true },
      orderBy: { createdAt: 'desc' },
    })

    return payments.map(PaymentPrismaMapper.toDomain)
  }
}
