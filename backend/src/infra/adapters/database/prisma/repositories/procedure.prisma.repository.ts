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

  async findByDoctorId(doctorId: string, filter: ProceduresFilter): Promise<Procedure[]> {
    const { period } = filter

    const procedures = await this.prisma.procedure.findMany({
      where: { doctorId, ...(period && { date: { gte: period.start, lte: period.end } }) },
      include: { payments: { where: { deletedAt: null } }, category: true },
      orderBy: { date: 'desc' },
    })
    return procedures.map(ProcedurePrismaMapper.toDomain)
  }

  async findProceduresWithPendingPayments(doctorId: string) {
    const procedures: any = await this.prisma.$queryRaw`
    SELECT p.*, p.total_payment
    FROM (
      SELECT SUM(payment.value) total_payment, procedure.*
      FROM procedures procedure
      INNER JOIN payments payment ON payment.procedure_id = procedure.id
      WHERE procedure.doctor_id = ${doctorId}
      GROUP BY procedure.id
    ) p
    WHERE p.invoice > p.total_payment AND p.doctor_id = ${doctorId}`

    console.log(procedures)

    return procedures.map((procedure) => ({
      ...ProcedurePrismaMapper.toDomain(procedure),
      totalPayment: procedure.total_payment,
    }))
  }
}
