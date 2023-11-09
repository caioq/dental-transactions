import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'

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
