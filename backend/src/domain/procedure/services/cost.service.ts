import { Injectable, NotFoundException } from '@nestjs/common'
import { Cost } from '../entities/cost.entity'
import { CostRepository } from '../repositories/cost.repository'

interface CreateCostParams extends Omit<Cost, 'id' | 'endDate' | 'createdAt'> {}

interface UpdateCostParams extends Omit<Cost, 'endDate' | 'createdAt'> {}

@Injectable()
export class CostService {
  constructor(private costRepository: CostRepository) {}

  async createCost(params: CreateCostParams): Promise<Cost> {
    const { installments, date } = params

    const endDate = this.calculateEndDate(date, installments)

    const cost = Cost.create({ ...params, endDate })
    return this.costRepository.create(cost)
  }

  async updateCost(params: UpdateCostParams): Promise<Cost> {
    const { installments, date, id } = params

    const currentCost = await this.costRepository.findById(id)
    if (!currentCost) throw new NotFoundException('Cost not found')

    const endDate = this.calculateEndDate(date, installments)

    const cost = Cost.create({ ...params, endDate })
    return this.costRepository.update(cost)
  }

  async deleteCost(costId: string, userId: string): Promise<void> {
    const currentCost = await this.costRepository.findByIdAndDoctorId(costId, userId)
    if (!currentCost) throw new NotFoundException('Cost not found')

    await this.costRepository.delete(costId, userId)
  }

  async getCostByDoctorId(doctorId: string, startDate: Date, endDate: Date): Promise<Cost[]> {
    const costs = await this.costRepository.findByDoctorId(doctorId, {
      period: { start: startDate, end: endDate },
    })
    return costs
  }

  private calculateEndDate(date: Date, installments: number) {
    if (installments === 1) return date

    const endDate = new Date(date)
    endDate.setUTCMonth(date.getUTCMonth() + installments)
    endDate.setDate(0)
    return endDate
  }
}
