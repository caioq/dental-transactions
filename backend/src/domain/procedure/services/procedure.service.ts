import { Injectable } from '@nestjs/common'
import { Procedure } from '../entities/procedure.entity'
import { ProcedureRepository } from '../repositories/procedure.repository'

interface CreateProcedureParams extends Omit<Procedure, 'id' | 'createdAt'> {}

@Injectable()
export class ProcedureService {
  constructor(private procedureRepository: ProcedureRepository) {}

  async createProcedure(params: CreateProcedureParams): Promise<Procedure> {
    const procedure = Procedure.create(params)
    return this.procedureRepository.create(procedure)
  }

  async getProceduresByDoctorId(doctorId: string): Promise<Procedure[]> {
    const procedures = await this.procedureRepository.findByDoctorId(doctorId)
    console.log('procedures', procedures)
    return procedures
  }
}
