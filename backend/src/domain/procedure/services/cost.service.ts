import { Injectable, NotFoundException } from '@nestjs/common'
import { Cost } from '../entities/cost.entity'
import { CostRepository } from '../repositories/cost.repository'

interface CreateCostParams extends Omit<Cost, 'id' | 'createdAt'> {}

interface UpdateCostParams extends Omit<Cost, 'createdAt'> {}

@Injectable()
export class CostService {
  constructor(private costRepository: CostRepository) {}

  async createCost(params: CreateCostParams): Promise<Cost> {
    const cost = Cost.create({ ...params })
    return this.costRepository.create(cost)
  }

  async updateProcedure(params: UpdateCostParams): Promise<Cost> {
    const currentCost = await this.costRepository.findById(params.id)
    if (!currentCost) throw new NotFoundException('Cost not found')

    const cost = Cost.create({ ...params })
    return this.costRepository.update(cost)
  }

  async getCostByDoctorId(doctorId: string, startDate: Date, endDate: Date): Promise<Cost[]> {
    const costs = await this.costRepository.findByDoctorId(doctorId, {
      period: { start: startDate, end: endDate },
    })
    return costs
  }
}
