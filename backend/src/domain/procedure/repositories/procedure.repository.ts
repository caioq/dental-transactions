import { Procedure } from '../entities/procedure.entity'

export interface ProceduresFilter {
  period: {
    start: Date
    end: Date
  }
}

export abstract class ProcedureRepository {
  abstract create(procedure: Procedure): Promise<Procedure>
  abstract update(procedure: Procedure): Promise<Procedure>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Procedure | null>
  abstract findByIdAndDoctorId(id: string, doctorId: string): Promise<Procedure | null>
  abstract findByDoctorId(doctorId: string, filter?: ProceduresFilter): Promise<Procedure[]>
}
