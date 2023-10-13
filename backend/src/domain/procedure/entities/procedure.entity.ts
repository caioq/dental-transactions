import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'
import { Payment } from './payment.entity'

export class Procedure {
  id!: string
  patientName?: string | null
  date!: Date
  category!: string
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

  static create(props: Optional<Procedure, 'id' | 'createdAt' | 'payments'>) {
    const procedure = new Procedure({
      ...props,
      // ...(props.payments?.length && {
      //   payments: props.payments.map((payment) => Payment.create(payment)),
      // }),
      id: props.id ?? new UniqueEntityID().toString(),
      createdAt: props.createdAt ?? new Date(),
    })

    return procedure
  }
}
