import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenService } from 'src/domain/procedure/ports'

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private jwtService: JwtService) {}

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload)
  }
}
