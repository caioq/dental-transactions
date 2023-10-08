import { Procedure } from '../entities/procedure.entity'

export abstract class ProcedureRepository {
  abstract create(procedure: Procedure): Promise<Procedure>
  abstract findByDoctorId(doctorId: string): Promise<Procedure[]>
}
