import { Prisma, Cost as PrismaCost } from '@prisma/client'
import { Cost } from '../../../../../domain/procedure/entities/cost.entity'

interface CostPrisma extends PrismaCost {}

export class CostPrismaMapper {
  static toPrisma(cost: Cost): Prisma.CostUncheckedCreateInput {
    return {
      id: cost.id,
      description: cost.description,
      date: cost.date,
      endDate: cost.endDate,
      installments: cost.installments,
      value: cost.value,
      categoryId: cost.categoryId,
      doctorId: cost.doctorId,
      createdAt: cost.createdAt,
    }
  }

  static toPrismaUpdate(cost: Cost): Prisma.CostUncheckedUpdateInput {
    return {
      id: cost.id,
      description: cost.description,
      date: cost.date,
      endDate: cost.endDate,
      installments: cost.installments,
      value: cost.value,
      categoryId: cost.categoryId,
      doctorId: cost.doctorId,
      createdAt: cost.createdAt,
    }
  }

  static toDomain(raw: CostPrisma): Cost {
    return Cost.create({
      ...raw,
      value: Number(raw.value),
    })
  }
}
