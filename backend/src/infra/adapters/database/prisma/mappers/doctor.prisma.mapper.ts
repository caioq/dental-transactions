import { Prisma, User as PrismaDoctor } from '@prisma/client'
import { Doctor } from '../../../../../domain/procedure/entities/doctor.entity'

export class DoctorPrismaMapper {
  static toPrisma(doctor: Doctor): Prisma.UserUncheckedCreateInput {
    return {
      ...doctor,
    }
  }

  static toDomain(raw: PrismaDoctor): Doctor {
    return Doctor.create({
      ...raw,
    })
  }
}
