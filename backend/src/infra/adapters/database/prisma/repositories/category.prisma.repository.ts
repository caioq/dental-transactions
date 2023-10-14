import { Injectable } from '@nestjs/common'
import { CategoryRepository } from 'src/domain/procedure/repositories/category.repository'
import { Category } from 'src/domain/procedure/entities/category.entity'
import { PrismaService } from '../prisma.service'
import { CategoryPrismaMapper } from '../mappers/category.prisma.mapper'

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany()
    return categories.map(CategoryPrismaMapper.toDomain)
  }
}
