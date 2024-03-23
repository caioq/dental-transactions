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
    const createdProcedure = await this.prisma.procedure.create({
      data,
      include: { payments: true, category: true },
    })
    return ProcedurePrismaMapper.toDomain(createdProcedure)
  }

  async update(procedure: Procedure): Promise<Procedure> {
    const data = ProcedurePrismaMapper.toPrismaUpdate(procedure)
    const updatedProcedure = await this.prisma.procedure.update({
      data,
      where: { id: procedure.id },
      include: { payments: true, category: true },
    })
    return ProcedurePrismaMapper.toDomain(updatedProcedure)
  }

  async findById(id: string) {
    const procedure = await this.prisma.procedure.findUnique({
      where: { id },
      include: { payments: { where: { deletedAt: null } }, category: true },
    })
    return procedure ? ProcedurePrismaMapper.toDomain(procedure) : null
  }

  async findByIdAndDoctorId(id: string, doctorId: string) {
    const procedure = await this.prisma.procedure.findUnique({
      where: { id, doctorId },
      include: { payments: { where: { deletedAt: null } }, category: true },
    })
    return procedure ? ProcedurePrismaMapper.toDomain(procedure) : null
  }

  async findByDoctorId(doctorId: string, filter: ProceduresFilter): Promise<Procedure[]> {
    const { period } = filter

    const procedures = await this.prisma.procedure.findMany({
      where: {
        doctorId,
        ...(period && { date: { gte: period.start, lte: period.end } }),
        deletedAt: null,
      },
      include: { payments: { where: { deletedAt: null } }, category: true },
      orderBy: { date: 'desc' },
    })
    return procedures.map(ProcedurePrismaMapper.toDomain)
  }

  async delete(procedureId: string) {
    await this.prisma.$transaction([
      this.prisma.payment.updateMany({
        data: { deletedAt: new Date() },
        where: { procedureId },
      }),
      this.prisma.procedure.update({ data: { deletedAt: new Date() }, where: { id: procedureId } }),
    ])
  }
}
