import { Prisma, Procedure as PrismaProcedure } from '@prisma/client'
import { Payment } from 'src/domain/procedure/entities/payment.entity'
import { Procedure } from 'src/domain/procedure/entities/procedure.entity'
import { PaymentPrismaMapper } from './payment.prisma.mapper'

export class ProcedurePrismaMapper {
  static toPrisma(procedure: Procedure): Prisma.ProcedureUncheckedCreateInput {
    return {
      ...procedure,
      patientName: procedure.patientName,
      cpf: procedure.cpf,
      payments: {
        connectOrCreate: procedure.payments?.map((payment) => ({
          where: { id: payment.id },
          create: payment,
        })),
      },
    }
  }

  static toDomain(raw: PrismaProcedure): Procedure {
    return Procedure.create({
      ...raw,
    })
  }
}
