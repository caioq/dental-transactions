import { CostCategory } from '../entities/costCategory.entity'

export abstract class CostCategoryRepository {
  abstract findAll(): Promise<CostCategory[]>
}
