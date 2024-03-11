import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  ProcedureService,
  CategoryService,
  AuthenticateService,
  CostCategoryService,
  UserService,
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
import { AppService } from '../app.service'
import { PaymentService } from '../domain/procedure/services/payment.service'
import { CostService } from '../domain/procedure/services/cost.service'

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
  ],
})
export class AppModule {}
