import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'

export class CostCategory {
  id!: string
  name!: string

  protected constructor(props: CostCategory) {
    Object.assign(this, props)
  }

  static create(props: Optional<CostCategory, 'id'>) {
    const cost = new CostCategory({
      ...props,
      id: props.id ?? new UniqueEntityID().toString(),
    })

    return cost
  }
}
