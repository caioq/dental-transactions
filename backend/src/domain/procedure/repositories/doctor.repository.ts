import { Doctor } from '../entities/doctor.entity'

export abstract class DoctorRepository {
  abstract findByEmail(email: string): Promise<Doctor | null>
  abstract create(doctor: Doctor): Promise<Doctor>
}
