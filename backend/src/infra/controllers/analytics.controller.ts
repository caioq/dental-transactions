import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common'
import { AnalyticsService } from '../../domain/procedure/services'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UserPayload } from '../auth/jwt.strategy'
import { CurrentUser } from '../auth/current-user.decorator'

@Controller('analytics')
export class AnalyticsController {
  private readonly logger = new Logger(AnalyticsController.name)

  constructor(private analyticsService: AnalyticsService) {}

  @Get('/revenue')
  @UseGuards(JwtAuthGuard)
  getRevenue(@CurrentUser() user: UserPayload, @Query('year') year: string) {
    const { id } = user

    this.logger.log(`Getting revenue analytics for doctor ${id} for the year of ${year}`)

    return this.analyticsService.getRevenueAndAverage(id, year)
  }
}
