import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ProcedureRepository } from 'src/domain/procedure/repositories/procedure.repository'
import { ProcedurePrismaRepository } from './prisma/repositories/procedure.prisma.repository'
import { CategoryRepository } from 'src/domain/procedure/repositories/category.repository'
import { CategoryPrismaRepository } from './prisma/repositories/category.prisma.repository'
import { DoctorRepository } from 'src/domain/procedure/repositories/doctor.repository'
import { DoctorPrismaRepository } from './prisma/repositories/doctor.prisma.repository'
import { PaymentRepository } from 'src/domain/procedure/repositories/payment.repository'
import { PaymentPrismaRepository } from './prisma/repositories/payment.prisma.repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: ProcedureRepository,
      useClass: ProcedurePrismaRepository,
    },
    {
      provide: CategoryRepository,
      useClass: CategoryPrismaRepository,
    },
    {
      provide: DoctorRepository,
      useClass: DoctorPrismaRepository,
    },
    {
      provide: PaymentRepository,
      useClass: PaymentPrismaRepository,
    },
  ],
  exports: [
    PrismaService,
    ProcedureRepository,
    CategoryRepository,
    DoctorRepository,
    PaymentRepository,
  ],
})
export class DatabaseModule {}
