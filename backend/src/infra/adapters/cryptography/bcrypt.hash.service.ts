import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcryptjs'
import { HashService } from 'src/domain/procedure/ports'

@Injectable()
export class BcryptHashService implements HashService {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
