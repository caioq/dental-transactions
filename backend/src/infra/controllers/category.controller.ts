import { Controller, Get, UseGuards } from '@nestjs/common'
import { CategoryService } from '../../domain/procedure/services'
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
