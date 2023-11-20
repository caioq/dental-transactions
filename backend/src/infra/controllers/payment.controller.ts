import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { UserPayload } from '../auth/jwt.strategy'
import { PaymentService } from '../../domain/procedure/services/payment.service'

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getPaymentsByDoctorId(
    @CurrentUser() user: UserPayload,
    @Query('start_date') startDate: Date,
    @Query('end_date') endDate: Date,
  ) {
    const { id } = user

    return this.paymentService.getPaymentsByDoctorId(id, startDate, endDate)
  }
}
