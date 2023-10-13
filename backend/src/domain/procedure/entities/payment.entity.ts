import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export class Payment {
  id!: string
  procedureId?: string
  value!: number
  date!: Date
  createdAt!: Date

  protected constructor(props: Payment) {
    Object.assign(this, props)
  }

  static create(props: Optional<Payment, 'id' | 'createdAt'>) {
    const procedure = new Payment({
      ...props,
      id: props.id ?? new UniqueEntityID().toString(),
      createdAt: props.createdAt ?? new Date(),
    })

    return procedure
  }
}
