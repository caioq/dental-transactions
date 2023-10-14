import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ProcedureRepository } from 'src/domain/procedure/repositories/procedure.repository'
import { ProcedurePrismaRepository } from './prisma/repositories/procedure.prisma.repository'
import { CategoryRepository } from 'src/domain/procedure/repositories/category.repository'
import { CategoryPrismaRepository } from './prisma/repositories/category.prisma.repository'

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
  ],
  exports: [PrismaService, ProcedureRepository, CategoryRepository],
})
export class DatabaseModule {}
