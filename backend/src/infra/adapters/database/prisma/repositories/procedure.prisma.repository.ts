import { Injectable } from '@nestjs/common'
import { ProcedureRepository } from 'src/domain/procedure/repositories/procedure.repository'
import { PrismaService } from '../prisma.service'
import { Procedure } from 'src/domain/procedure/entities/procedure.entity'
import { ProcedurePrismaMapper } from '../mappers/procedure.prisma.mapper'

@Injectable()
export class ProcedurePrismaRepository implements ProcedureRepository {
  constructor(private prisma: PrismaService) {}

  async create(procedure: Procedure): Promise<Procedure> {
    const data = ProcedurePrismaMapper.toPrisma(procedure)
    return this.prisma.procedure.create({ data })
  }

  async findByDoctorId(doctorId: string): Promise<Procedure[]> {
    const procedures = await this.prisma.procedure.findMany({
      where: { doctorId },
      include: { payments: true },
    })
    return procedures.map(ProcedurePrismaMapper.toDomain)
  }
}
