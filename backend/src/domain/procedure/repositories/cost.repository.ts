import { Cost } from '../entities/cost.entity'

export interface CostsFilter {
  period: {
    start: Date
    end: Date
  }
}

export abstract class CostRepository {
  abstract create(cost: Cost): Promise<Cost>
  abstract update(cost: Cost): Promise<Cost>
  abstract delete(costId: string, doctorId: string): Promise<void>
  abstract findById(id: string): Promise<Cost | null>
  abstract findByIdAndDoctorId(id: string, doctorId: string): Promise<Cost | null>
  abstract findByDoctorId(doctorId: string, filter?: CostsFilter): Promise<Cost[]>
}
