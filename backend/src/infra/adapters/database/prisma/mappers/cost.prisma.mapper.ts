import { Prisma, Cost as PrismaCost } from '@prisma/client'
import { Cost } from '../../../../../domain/procedure/entities/cost.entity'

interface CostPrisma extends PrismaCost {}

export class CostPrismaMapper {
  static toPrisma(cost: Cost): Prisma.CostUncheckedCreateInput {
    return {
      ...cost,
    }
  }

  static toPrismaUpdate(cost: Cost): Prisma.CostUncheckedUpdateInput {
    return {
      ...cost,
    }
  }

  static toDomain(raw: CostPrisma): Cost {
    return Cost.create({
      ...raw,
      value: Number(raw.value),
    })
  }
}
