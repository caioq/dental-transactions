import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ProcedureRepository } from 'src/domain/procedure/repositories/procedure.repository'
import { ProcedurePrismaRepository } from './prisma/repositories/procedure.prisma.repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: ProcedureRepository,
      useClass: ProcedurePrismaRepository,
    },
  ],
  exports: [PrismaService, ProcedureRepository],
})
export class DatabaseModule {}
