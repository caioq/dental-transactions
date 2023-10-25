import { Controller, Get, UseGuards } from '@nestjs/common'
import { CategoryService } from 'src/domain/procedure/services/category.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCategories() {
    return this.categoryService.getCategories()
  }
}
