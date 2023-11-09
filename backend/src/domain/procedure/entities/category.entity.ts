import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'

export class Category {
  id!: string
  name!: string

  protected constructor(props: Category) {
    Object.assign(this, props)
  }

  static create(props: Optional<Category, 'id'>) {
    const procedure = new Category({
      ...props,
      id: props.id ?? new UniqueEntityID().toString(),
    })

    return procedure
  }
}
