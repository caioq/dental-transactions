import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { UserPayload } from '../auth/jwt.strategy'
import { PaymentService } from 'src/domain/procedure/services/payment.service'

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getProceduresByDoctorId(
    @CurrentUser() user: UserPayload,
    @Query('month_year') monthYear: string,
  ) {
    const { id } = user
    let startDate, endDate
    if (monthYear) {
      const [month, year] = monthYear.split('-')
      startDate = new Date(Number(year), Number(month) - 1, 1)
      endDate = new Date(Number(year), Number(month), 0)
    }

    return this.paymentService.getPaymentsByDoctorId(id, startDate, endDate)
  }
}
