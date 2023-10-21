import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  ProcedureService,
  CategoryService,
  AuthenticateService,
} from 'src/domain/procedure/services'
import { ProcedureController } from './controllers/procedure.controller'
import { DatabaseModule } from './adapters/database/database.module'
import { CategoryController } from './controllers/category.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { CryptographyModule } from './adapters/cryptography/cryptography.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    EnvModule,
    AuthModule,
    CryptographyModule,
  ],
  controllers: [ProcedureController, CategoryController, AuthenticateController],
  providers: [ProcedureService, CategoryService, AuthenticateService],
})
export class AppModule {}
