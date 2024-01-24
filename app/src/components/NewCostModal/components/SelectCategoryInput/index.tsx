import { SelectHTMLAttributes } from "react";
import { SelectInput } from "./styles";

interface CategorySelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  categories: Array<{ id: string; name: string }>;
}

export function CategorySelectInput(props: CategorySelectInputProps) {
  const { categories, ...rest } = props;
  return (
    <SelectInput defaultValue="" {...rest}>
      <option value="" disabled hidden>
        Selecione o tipo do procedimento
      </option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </SelectInput>
  );
}
