import { Controller, Get, UseGuards } from '@nestjs/common'
import { CostCategoryService } from '../../domain/procedure/services'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('cost-categories')
export class CostCategoryController {
  constructor(private costCategoryService: CostCategoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCategories() {
    return this.costCategoryService.getCategories()
  }
}
