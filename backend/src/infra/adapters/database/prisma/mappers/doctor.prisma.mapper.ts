import { User as PrismaDoctor } from '@prisma/client'
import { Doctor } from 'src/domain/procedure/entities/doctor.entity'

export class DoctorPrismaMapper {
  static toDomain(raw: PrismaDoctor): Doctor {
    return Doctor.create({
      ...raw,
    })
  }
}
