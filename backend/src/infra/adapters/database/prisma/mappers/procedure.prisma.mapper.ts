import { Prisma, Procedure as PrismaProcedure } from '@prisma/client'
import { Payment } from 'src/domain/procedure/entities/payment.entity'
import { Procedure } from 'src/domain/procedure/entities/procedure.entity'
import { PaymentPrismaMapper } from './payment.prisma.mapper'

export class ProcedurePrismaMapper {
  static toPrisma(procedure: Procedure): Prisma.ProcedureUncheckedCreateInput {
    // const payments = procedure.payments?.map((payment) => PaymentPrismaMapper.toPrisma(payment))
    return {
      ...procedure,
      // doctorId: procedure.doctorId,
      // id: procedure.id.toString(),
      patientName: procedure.patientName,
      cpf: procedure.cpf,
      payments: {
        create: procedure.payments,
      },

      // category: procedure.category,
      // date: procedure.date,
      // doctorId: procedure.doctorId,
      // paidValue: procedure.paidValue,
      // toReceiveValue: procedure.toReceiveValue,
      // value: procedure.value,
    }
  }

  // static toPrismaCreateInput(procedure: Procedure): Prisma.ProcedureUncheckedCreateInput {
  //   const payments =
  //   return {
  //     ...procedure,
  //     // doctorId: procedure.doctorId,
  //     // id: procedure.id.toString(),
  //     patientName: procedure.patientName,
  //     cpf: procedure.cpf,
  //     // payments: procedure.payments?.map((payment) => PaymentPrismaMapper.toPrisma(payment)),
  //     payments: {
  //       cr
  //     }

  //     // category: procedure.category,
  //     // date: procedure.date,
  //     // doctorId: procedure.doctorId,
  //     // paidValue: procedure.paidValue,
  //     // toReceiveValue: procedure.toReceiveValue,
  //     // value: procedure.value,
  //   }
  // }

  static toDomain(raw: PrismaProcedure): Procedure {
    return Procedure.create({
      ...raw,
    })
  }
}
