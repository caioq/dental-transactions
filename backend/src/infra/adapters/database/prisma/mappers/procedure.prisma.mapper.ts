import { Prisma, Procedure as PrismaProcedure } from '@prisma/client'
import { Procedure } from 'src/domain/procedure/entities/procedure.entity'

export class ProcedurePrismaMapper {
  static toPrisma(procedure: Procedure): Prisma.ProcedureUncheckedCreateInput {
    return {
      ...procedure,
      // doctorId: procedure.doctorId,
      // id: procedure.id.toString(),
      patientName: procedure.patientName,
      cpf: procedure.cpf,
      // category: procedure.category,
      // date: procedure.date,
      // doctorId: procedure.doctorId,
      // paidValue: procedure.paidValue,
      // toReceiveValue: procedure.toReceiveValue,
      // value: procedure.value,
    }
  }

  static toDomain(raw: PrismaProcedure): Procedure {
    return Procedure.create({
      ...raw,
    })
  }
}
