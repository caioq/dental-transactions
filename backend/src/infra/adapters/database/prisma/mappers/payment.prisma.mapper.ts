import { Prisma, Payment as PrismaPayment } from '@prisma/client'
import { Payment } from 'src/domain/procedure/entities/payment.entity'

export class PaymentPrismaMapper {
  static toPrisma(payment: Payment): Prisma.PaymentCreateInput {
    return {
      ...payment,
      procedure: {
        connect: {
          id: payment.procedureId,
        },
      },
      // ...((payment.procedureId && { procedureId: payment.procedureId }) || { procedureId: null }),
    }
  }

  static toDomain(raw: PrismaPayment): Payment {
    return Payment.create({
      ...raw,
    })
  }
}
