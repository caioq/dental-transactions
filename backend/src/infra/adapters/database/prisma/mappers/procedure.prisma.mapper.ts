import { Prisma, Procedure as PrismaProcedure } from '@prisma/client'
import { Payment } from '../../../../../domain/procedure/entities/payment.entity'
import { Procedure } from '../../../../../domain/procedure/entities/procedure.entity'
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

  static toPrismaUpdate(procedure: Procedure): Prisma.ProcedureUncheckedUpdateInput {
    return {
      ...procedure,
      patientName: procedure.patientName,
      cpf: procedure.cpf,
      payments: {
        upsert: procedure.payments?.map((payment) => ({
          where: { id: payment.id },
          update: payment,
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
