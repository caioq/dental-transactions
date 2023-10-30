import { Injectable } from '@nestjs/common'
import { DoctorRepository } from '../repositories/doctor.repository'
import { HashService, TokenService } from '../ports'

interface AuthenticateParams {
  email: string
  password: string
}

interface AuthenticateResponse {
  accessToken: string
  user: {
    id: string
    name: string
    email: string
  }
}

@Injectable()
export class AuthenticateService {
  constructor(
    private doctorRepository: DoctorRepository,
    private hashService: HashService,
    private tokenService: TokenService,
  ) {}

  async authenticate({ email, password }: AuthenticateParams): Promise<AuthenticateResponse> {
    const doctor = await this.doctorRepository.findByEmail(email)

    if (!doctor) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await this.hashService.compare(password, doctor.password)

    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    const accessToken = await this.tokenService.encrypt({
      id: doctor.id,
    })

    const user = {
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
    }

    return { accessToken, user }
  }
}
