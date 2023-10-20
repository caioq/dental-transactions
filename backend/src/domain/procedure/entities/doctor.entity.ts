import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export class Doctor {
  id!: string
  name!: string
  email!: string
  password!: string

  protected constructor(props: Doctor) {
    Object.assign(this, props)
  }

  static create(props: Optional<Doctor, 'id'>) {
    const procedure = new Doctor({
      ...props,
      id: props.id ?? new UniqueEntityID().toString(),
    })

    return procedure
  }
}
