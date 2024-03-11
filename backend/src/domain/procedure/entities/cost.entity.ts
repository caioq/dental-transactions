import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'

export class Cost {
  id!: string
  description?: string | null
  date!: Date
  endDate!: Date
  installments: number = 1
  value!: number
  installmentValue?: number
  categoryId!: string
  doctorId!: string
  createdAt!: Date

  protected constructor(props: Cost) {
    Object.assign(this, props)
  }

  static create(props: Optional<Cost, 'id' | 'installmentValue' | 'createdAt'>) {
    const cost = new Cost({
      ...props,
      id: props.id ?? new UniqueEntityID().toString(),
      createdAt: props.createdAt ?? new Date(),
      installmentValue: props.value / (props.installments || 1),
    })

    return cost
  }
}
