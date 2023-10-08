import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export class Procedure {
  id!: string
  patientName?: string | null
  date!: Date
  category!: string
  value!: number
  toReceiveValue!: number
  cpf?: string | null
  doctorId!: string
  paidValue?: number | null
  createdAt!: Date

  protected constructor(props: Procedure) {
    Object.assign(this, props)
  }

  // get id() {
  //   return this.id
  // }

  // get patientName() {
  //   return this._patientName
  // }

  // set patientName(value: string) {
  //   this._patientName = value
  // }

  // get cpf() {
  //   return this.cpf
  // }

  // get value() {
  //   return this.value
  // }

  // get toReceiveValue() {
  //   return this.toReceiveValue
  // }

  // get paidValue() {
  //   return this.paidValue
  // }

  // get category() {
  //   return this.category
  // }

  // get doctorId() {
  //   return this.doctorId
  // }

  // get date() {
  //   return this.date
  // }

  static create(props: Optional<Procedure, 'id' | 'createdAt'>) {
    const procedure = new Procedure({
      ...props,
      id: props.id ?? new UniqueEntityID().toString(),
      createdAt: props.createdAt ?? new Date(),
    })

    return procedure
  }
}
