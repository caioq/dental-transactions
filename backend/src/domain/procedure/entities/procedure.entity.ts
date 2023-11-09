import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'
import { Payment } from './payment.entity'

export class Procedure {
  id!: string
  patientName?: string | null
  date!: Date
  categoryId!: string
  billing!: number
  invoice!: number
  cpf?: string | null
  doctorId!: string
  payment?: number | null
  payments?: Payment[]
  createdAt!: Date

  protected constructor(props: Procedure) {
    Object.assign(this, props)
  }

  static create(props: Optional<Procedure, 'id' | 'createdAt' | 'payments'>) {
    const procedure = new Procedure({
      ...props,
      id: props.id ?? new UniqueEntityID().toString(),
      createdAt: props.createdAt ?? new Date(),
    })

    return procedure
  }
}
