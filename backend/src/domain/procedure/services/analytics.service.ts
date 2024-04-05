import { Injectable } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { CostService } from './cost.service'
import { Cost } from '../entities/cost.entity'

@Injectable()
export class AnalyticsService {
  constructor(
    private paymentService: PaymentService,
    private costService: CostService,
  ) {}

  async getRevenueAndAverage(doctorId: string, year: string): Promise<any> {
    const { firstDay, lastDay } = this.getFirstAndLastDayOfYear(year)

    const incomes = await this.paymentService.getPaymentsByDoctorId(doctorId, firstDay, lastDay)
    const incomesGroupedByMonth = this.groupByMonth(incomes)

    const outcomes = await this.costService.getCostByDoctorId(doctorId, firstDay, lastDay)
    const outcomesGroupedByMonth = this.groupCostsByMonth(outcomes)

    const maxMonthWithIncome = Math.max(
      ...Object.keys(incomesGroupedByMonth).map((key) => Number(key)),
    )
    const maxMonthWithOutcome = Math.max(
      ...Object.keys(outcomesGroupedByMonth).map((key) => Number(key)),
    )
    const maxMonthWithTransaction = Math.max(maxMonthWithIncome, maxMonthWithOutcome)
    const currentMonth = new Date().getUTCMonth()
    const maxMonth = Math.max(maxMonthWithTransaction, currentMonth)

    const revenuePerMonth = Array.from({ length: maxMonth + 1 }, (_, month) => {
      const income = incomesGroupedByMonth[month] || 0
      const outcome = outcomesGroupedByMonth[month] || 0
      const balance = income - outcome

      return { month, income, outcome, balance }
    })

    const totalIncome = revenuePerMonth.reduce((acc, { income }) => acc + income, 0)
    const averageIncome = totalIncome / (currentMonth + 1)
    const totalOutcome = revenuePerMonth.reduce((acc, { outcome }) => acc + outcome, 0)
    const averageOutcome = totalOutcome / (currentMonth + 1)
    const totalBalance = revenuePerMonth.reduce((acc, { balance }) => acc + balance, 0)
    const averageBalance = totalBalance / (currentMonth + 1)

    return {
      revenuePerMonth,
      average: {
        income: averageIncome,
        outcome: averageOutcome,
        balance: averageBalance,
      },
    }
  }

  private groupCostsByMonth(costs: Cost[]) {
    const costsWithInstallments = costs.flatMap((cost) => {
      if (cost.installments === 1) return [{ value: cost.value, date: cost.date }]

      return Array.from({ length: cost.installments }, (_, index) => {
        const date = new Date(cost.date)
        date.setUTCMonth(date.getUTCMonth() + index)
        return { value: cost.installmentValue || 0, date }
      })
    })

    return this.groupByMonth(costsWithInstallments)
  }

  private groupByMonth(items: Array<{ value: number; date: Date }>) {
    return items.reduce((acc, item) => {
      const month = new Date(item.date).getUTCMonth()
      const current = acc[month] || 0

      return {
        ...acc,
        [month]: current + item.value,
      }
    }, {})
  }

  private getFirstAndLastDayOfYear(yearString: string): { firstDay: Date; lastDay: Date } {
    const year = parseInt(yearString, 10)

    const firstDay = new Date(Date.UTC(year, 0, 1))
    const lastDay = new Date(Date.UTC(year, 11, 31))

    return { firstDay, lastDay }
  }
}
