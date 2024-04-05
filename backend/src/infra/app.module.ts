import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  ProcedureService,
  CategoryService,
  AuthenticateService,
  CostCategoryService,
  UserService,
  AnalyticsService,
  CostService,
  PaymentService,
} from '../domain/procedure/services'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { AuthModule } from './auth/auth.module'
import { AppController } from '../app.controller'
import { DatabaseModule } from './adapters/database/database.module'
import { CryptographyModule } from './adapters/cryptography/cryptography.module'
import { ProcedureController } from './controllers/procedure.controller'
import { CategoryController } from './controllers/category.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CostCategoryController } from './controllers/costCategory.controller'
import { PaymentController } from './controllers/payment.controller'
import { CostController } from './controllers/cost.controller'
import { UserController } from './controllers/user.controller'
import { AnalyticsController } from './controllers/analytics.controller'
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
    UserController,
    ProcedureController,
    CostController,
    CategoryController,
    CostCategoryController,
    AuthenticateController,
    PaymentController,
    AppController,
    AnalyticsController,
  ],
  providers: [
    UserService,
    ProcedureService,
    CostService,
    CategoryService,
    CostCategoryService,
    AuthenticateService,
    PaymentService,
    AppService,
    AnalyticsService,
  ],
})
export class AppModule {}
