import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ProcedureService } from 'src/domain/procedure/services/procedure.service'
import { CategoryService } from 'src/domain/procedure/services/category.service'
import { AuthenticateService } from 'src/domain/procedure/services/authenticate.service'
import { ProcedureController } from './controllers/procedure.controller'
import { DatabaseModule } from './adapters/database/database.module'
import { CategoryController } from './controllers/category.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    EnvModule,
  ],
  controllers: [ProcedureController, CategoryController, AuthenticateController],
  providers: [ProcedureService, CategoryService, AuthenticateService],
})
export class AppModule {}
