import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'

export class Doctor {
  id!: string
  name!: string
  email!: string
  password!: string
  createdAt!: Date

  protected constructor(props: Doctor) {
    Object.assign(this, props)
  }

  static create(props: Optional<Doctor, 'id' | 'createdAt'>) {
    const doctor = new Doctor({
      ...props,
      id: props.id ?? new UniqueEntityID().toString(),
      createdAt: props.createdAt ?? new Date(),
    })

    return doctor
  }
}
