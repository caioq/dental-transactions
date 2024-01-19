import { CostCategory as PrismaCostCategory } from '@prisma/client'
import { CostCategory } from '../../../../../domain/procedure/entities/costCategory.entity'

export class CategoryPrismaMapper {
  static toDomain(raw: PrismaCostCategory): CostCategory {
    return CostCategory.create({
      ...raw,
    })
  }
}
