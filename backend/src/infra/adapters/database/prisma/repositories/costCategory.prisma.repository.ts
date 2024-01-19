import { Injectable } from '@nestjs/common'
import { CostCategoryRepository } from '../../../../../domain/procedure/repositories/costCategory.repository'
import { CostCategory } from '../../../../../domain/procedure/entities/costCategory.entity'
import { PrismaService } from '../prisma.service'
import { CategoryPrismaMapper } from '../mappers/category.prisma.mapper'

@Injectable()
export class CostCategoryPrismaRepository implements CostCategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CostCategory[]> {
    const categories = await this.prisma.costCategory.findMany()
    return categories.map(CategoryPrismaMapper.toDomain)
  }
}
