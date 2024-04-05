import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DoctorRepository } from '../repositories/doctor.repository'
import { HashService, TokenService } from '../ports'
import { Doctor } from '../entities/doctor.entity'

interface CreateUserParams {
  email: string
  password: string
  name: string
}

interface ChangePasswordParams {
  id: string
  currentPassword: string
  newPassword: string
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

  async changePassword({ id, currentPassword, newPassword }: ChangePasswordParams): Promise<void> {
    const user = await this.doctorRepository.findById(id)
    if (!user) {
      throw new UnauthorizedException('User does not exists')
    }

    const isCurrentPasswordCorrect = await this.hashService.compare(currentPassword, user.password)
    if (!isCurrentPasswordCorrect) {
      throw new UnauthorizedException('Current password is incorrect')
    }

    const hashedPassword = await this.hashService.hash(newPassword)
    await this.doctorRepository.update({ ...user, password: hashedPassword })
  }
}
