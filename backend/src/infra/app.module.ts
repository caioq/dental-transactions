import { Module } from '@nestjs/common'
import { ProcedureService } from 'src/domain/procedure/services/procedure.service'
import { CategoryService } from 'src/domain/procedure/services/category.service'
import { ProcedureController } from './controllers/procedure.controller'
import { DatabaseModule } from './adapters/database/database.module'
import { CategoryController } from './controllers/category.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [ProcedureController, CategoryController],
  providers: [ProcedureService, CategoryService],
})
export class AppModule {}
