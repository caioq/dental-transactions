import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DoctorRepository } from '../repositories/doctor.repository'
import { HashService, TokenService } from '../ports'
import { Doctor } from '../entities/doctor.entity'

interface CreateUserParams {
  email: string
  password: string
  name: string
}

@Injectable()
export class UserService {
  constructor(
    private doctorRepository: DoctorRepository,
    private hashService: HashService,
  ) {}

  async createUser({ email, name, password }: CreateUserParams): Promise<Doctor> {
    const user = await this.doctorRepository.findByEmail(email)
    if (user) {
      throw new UnauthorizedException('User already exists')
    }

    const hashedPassword = await this.hashService.hash(password)
    const doctor = Doctor.create({ email, name, password: hashedPassword })
    const newDoctor = await this.doctorRepository.create(doctor)

    return newDoctor
  }
}
