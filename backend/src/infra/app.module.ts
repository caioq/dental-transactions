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
import { PaymentController } from './controllers/payment.controller'
import { PaymentService } from 'src/domain/procedure/services/payment.service'

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
  controllers: [ProcedureController, CategoryController, AuthenticateController, PaymentController],
  providers: [ProcedureService, CategoryService, AuthenticateService, PaymentService],
})
export class AppModule {}
