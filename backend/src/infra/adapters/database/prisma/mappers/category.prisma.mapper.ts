import { Category as PrismaCategory } from '@prisma/client'
import { Category } from 'src/domain/procedure/entities/category.entity'

export class CategoryPrismaMapper {
  static toDomain(raw: PrismaCategory): Category {
    return Category.create({
      ...raw,
    })
  }
}
