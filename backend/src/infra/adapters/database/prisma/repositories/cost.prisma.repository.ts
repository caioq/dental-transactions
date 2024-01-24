import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CostPrismaMapper } from '../mappers/cost.prisma.mapper'
import {
  CostRepository,
  CostsFilter,
} from '../../../../../domain/procedure/repositories/cost.repository'
import { Cost } from '../../../../../domain/procedure/entities/cost.entity'

@Injectable()
export class CostPrismaRepository implements CostRepository {
  constructor(private prisma: PrismaService) {}

  async create(cost: Cost): Promise<Cost> {
    const data = CostPrismaMapper.toPrisma(cost)
    const createdCost = await this.prisma.cost.create({
      data,
      include: { category: true },
    })
    return CostPrismaMapper.toDomain(createdCost)
  }

  async update(cost: Cost): Promise<Cost> {
    const data = CostPrismaMapper.toPrismaUpdate(cost)
    const updatedCost = await this.prisma.cost.update({
      data,
      where: { id: cost.id },
      include: { category: true },
    })
    return CostPrismaMapper.toDomain(updatedCost)
  }

  async findById(id: string) {
    const cost = await this.prisma.cost.findUnique({
      where: { id },
      include: { category: true },
    })
    return cost ? CostPrismaMapper.toDomain(cost) : null
  }

  async findByDoctorId(doctorId: string, filter: CostsFilter): Promise<Cost[]> {
    const { period } = filter

    const procedures = await this.prisma.cost.findMany({
      where: { doctorId, ...(period && { date: { gte: period.start, lte: period.end } }) },
      include: { category: true },
      orderBy: { date: 'desc' },
    })
    return procedures.map(CostPrismaMapper.toDomain)
  }
}
