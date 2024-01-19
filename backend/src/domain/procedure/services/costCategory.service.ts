import { Injectable } from '@nestjs/common'
import { CostCategory } from '../entities/costCategory.entity'
import { CostCategoryRepository } from '../repositories/costCategory.repository'

@Injectable()
export class CostCategoryService {
  constructor(private costCategoryRepository: CostCategoryRepository) {}

  async getCategories(): Promise<CostCategory[]> {
    return this.costCategoryRepository.findAll()
  }
}
