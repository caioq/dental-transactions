import { Injectable } from '@nestjs/common'
import { Category } from '../entities/category.entity'
import { CategoryRepository } from '../repositories/category.repository'

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll()
  }
}
