import { NestFactory } from '@nestjs/core'
import { AppModule } from './infra/app.module'
import { EnvService } from './infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(EnvService)
  const port = configService.get('PORT')
  const appBaseUrl = configService.get('APP_BASE_URL')

  app.enableCors({
    origin: appBaseUrl,
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  })

  await app.listen(port)
}
bootstrap()
