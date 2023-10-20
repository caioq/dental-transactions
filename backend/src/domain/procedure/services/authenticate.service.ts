import { Injectable } from '@nestjs/common'
import { DoctorRepository } from '../repositories/doctor.repository'

interface AuthenticateParams {
  email: string
  password: string
}

interface AuthenticateResponse {
  accessToken: string
}

@Injectable()
export class AuthenticateService {
  constructor(private doctorRepository: DoctorRepository) {}

  async authenticate({ email, password }: AuthenticateParams): Promise<AuthenticateResponse> {
    const doctor = await this.doctorRepository.findByEmail(email)

    if (!doctor) {
      throw new Error('Invalid credentials')
    }

    return { accessToken: 'token' }
  }
}
