import { Cost } from '../entities/cost.entity'

export interface CostsFilter {
  period: {
    start: Date
    end: Date
  }
}

export abstract class CostRepository {
  abstract create(procedure: Cost): Promise<Cost>
  abstract update(procedure: Cost): Promise<Cost>
  abstract findById(id: string): Promise<Cost | null>
  abstract findByDoctorId(doctorId: string, filter?: CostsFilter): Promise<Cost[]>
}
