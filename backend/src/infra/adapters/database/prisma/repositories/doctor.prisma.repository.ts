import { Injectable } from '@nestjs/common'
import { DoctorRepository } from '../../../../..//domain/procedure/repositories/doctor.repository'
import { PrismaService } from '../prisma.service'
import { Doctor } from '../../../../../domain/procedure/entities/doctor.entity'
import { DoctorPrismaMapper } from '../mappers/doctor.prisma.mapper'

@Injectable()
export class DoctorPrismaRepository implements DoctorRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Doctor | null> {
    const doctor = await this.prisma.user.findUnique({ where: { email } })
    if (!doctor) return null

    return DoctorPrismaMapper.toDomain(doctor)
  }

  async create(user: Doctor): Promise<Doctor> {
    const data = DoctorPrismaMapper.toPrisma(user)
    const doctor = await this.prisma.user.create({ data })

    return DoctorPrismaMapper.toDomain(doctor)
  }
}
