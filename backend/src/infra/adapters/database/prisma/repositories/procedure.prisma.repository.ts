import { Injectable } from '@nestjs/common'
import {
  ProcedureRepository,
  ProceduresFilter,
} from '../../../../../domain/procedure/repositories/procedure.repository'
import { PrismaService } from '../prisma.service'
import { Procedure } from '../../../../../domain/procedure/entities/procedure.entity'
import { ProcedurePrismaMapper } from '../mappers/procedure.prisma.mapper'

@Injectable()
export class ProcedurePrismaRepository implements ProcedureRepository {
  constructor(private prisma: PrismaService) {}

  async create(procedure: Procedure): Promise<Procedure> {
    const data = ProcedurePrismaMapper.toPrisma(procedure)
    return this.prisma.procedure.create({ data, include: { payments: true, category: true } })
  }

  async update(procedure: Procedure): Promise<Procedure> {
    const data = ProcedurePrismaMapper.toPrismaUpdate(procedure)
    return this.prisma.procedure.update({
      data,
      where: { id: procedure.id },
      include: { payments: true, category: true },
    })
  }

  async findById(id: string) {
    const procedure = await this.prisma.procedure.findUnique({
      where: { id },
      include: { payments: { where: { deletedAt: null } }, category: true },
    })
    return procedure ? ProcedurePrismaMapper.toDomain(procedure) : null
  }

  async findByDoctorId(doctorId: string, filter: ProceduresFilter): Promise<Procedure[]> {
    const { period } = filter

    const procedures = await this.prisma.procedure.findMany({
      where: { doctorId, ...(period && { date: { gte: period.start, lte: period.end } }) },
      include: { payments: { where: { deletedAt: null } }, category: true },
      orderBy: { createdAt: 'desc' },
    })
    return procedures.map(ProcedurePrismaMapper.toDomain)
  }
}
