import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AnalyticsService } from '../../domain/procedure/services'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UserPayload } from '../auth/jwt.strategy'
import { CurrentUser } from '../auth/current-user.decorator'

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('/revenue')
  @UseGuards(JwtAuthGuard)
  getRevenue(@CurrentUser() user: UserPayload, @Query('year') year: string) {
    const { id } = user

    return this.analyticsService.getRevenueAndAverage(id, year)
  }
}
