import { Procedure } from '../entities/procedure.entity'

export interface ProceduresFilter {
  period: {
    start: Date
    end: Date
  }
}

export interface ProcedurePendingPayments extends Procedure {
  totalPayment: number
}

export abstract class ProcedureRepository {
  abstract create(procedure: Procedure): Promise<Procedure>
  abstract update(procedure: Procedure): Promise<Procedure>
  abstract findById(id: string): Promise<Procedure | null>
  abstract findByDoctorId(doctorId: string, filter?: ProceduresFilter): Promise<Procedure[]>
  abstract findProceduresWithPendingPayments(doctorId: string): Promise<ProcedurePendingPayments[]>
}
