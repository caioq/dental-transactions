import { Module } from '@nestjs/common'
import { HashService, TokenService } from 'src/domain/procedure/ports'
import { JwtTokenService } from './jwt.token.service'
import { BcryptHashService } from './bcrypt.hash.service'

@Module({
  providers: [
    { provide: TokenService, useClass: JwtTokenService },
    { provide: HashService, useClass: BcryptHashService },
  ],
  exports: [TokenService, HashService],
})
export class CryptographyModule {}
