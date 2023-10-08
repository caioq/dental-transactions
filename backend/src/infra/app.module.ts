import { Module } from '@nestjs/common'
import { ProcedureController } from './controllers/procedure.controller'
import { DatabaseModule } from './adapters/database/database.module'
import { ProcedureService } from 'src/domain/procedure/services/procedure.service'

@Module({
  imports: [DatabaseModule],
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class AppModule {}
