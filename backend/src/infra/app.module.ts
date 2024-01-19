import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  ProcedureService,
  CategoryService,
  AuthenticateService,
  CostCategoryService,
} from '../domain/procedure/services'
import { ProcedureController } from './controllers/procedure.controller'
import { DatabaseModule } from './adapters/database/database.module'
import { CategoryController } from './controllers/category.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CostCategoryController } from './controllers/costCategory.controller'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { CryptographyModule } from './adapters/cryptography/cryptography.module'
import { AuthModule } from './auth/auth.module'
import { PaymentController } from './controllers/payment.controller'
import { PaymentService } from '../domain/procedure/services/payment.service'
import { AppController } from '../app.controller'
import { AppService } from '../app.service'

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
  controllers: [
    ProcedureController,
    CategoryController,
    CostCategoryController,
    AuthenticateController,
    PaymentController,
    AppController,
  ],
  providers: [
    ProcedureService,
    CategoryService,
    CostCategoryService,
    AuthenticateService,
    PaymentService,
    AppService,
  ],
})
export class AppModule {}
