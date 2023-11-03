import { Injectable } from '@nestjs/common'
import {
  PaymentFilter,
  PaymentRepository,
} from 'src/domain/procedure/repositories/payment.repository'
import { PrismaService } from '../prisma.service'
import { Procedure } from 'src/domain/procedure/entities/procedure.entity'
import { ProcedurePrismaMapper } from '../mappers/procedure.prisma.mapper'
import { PaymentPrismaMapper } from '../mappers/payment.prisma.mapper'
import { Payment } from 'src/domain/procedure/entities/payment.entity'

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
      },
      include: { procedure: true },
      orderBy: { createdAt: 'desc' },
    })

    return payments.map(PaymentPrismaMapper.toDomain)
  }
}
