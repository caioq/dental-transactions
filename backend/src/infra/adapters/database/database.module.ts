import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ProcedureRepository } from '../../../domain/procedure/repositories/procedure.repository'
import { ProcedurePrismaRepository } from './prisma/repositories/procedure.prisma.repository'
import { CategoryRepository } from '../../../domain/procedure/repositories/category.repository'
import { CategoryPrismaRepository } from './prisma/repositories/category.prisma.repository'
import { DoctorRepository } from '../../../domain/procedure/repositories/doctor.repository'
import { DoctorPrismaRepository } from './prisma/repositories/doctor.prisma.repository'
import { PaymentRepository } from '../../../domain/procedure/repositories/payment.repository'
import { PaymentPrismaRepository } from './prisma/repositories/payment.prisma.repository'
import { CostCategoryRepository } from '../../../domain/procedure/repositories/costCategory.repository'
import { CostCategoryPrismaRepository } from './prisma/repositories/costCategory.prisma.repository'

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
    {
      provide: CostCategoryRepository,
      useClass: CostCategoryPrismaRepository,
    },
  ],
  exports: [
    PrismaService,
    ProcedureRepository,
    CategoryRepository,
    CostCategoryRepository,
    DoctorRepository,
    PaymentRepository,
  ],
})
export class DatabaseModule {}
