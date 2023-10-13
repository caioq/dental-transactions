import { Trash } from "phosphor-react";
import { DeletePaymentButton, NewPaymentCardContainer, NewPaymentCardContent } from "./styles";
import { UseFormRegister } from "react-hook-form";
import { NewProcedureFormInputs } from "../../types";

interface NewPaymentCardProps {
  index: number;
  position: number;
  removePayment: (index: number) => void;
  register: UseFormRegister<NewProcedureFormInputs>;
}

export function NewPaymentCard(props: NewPaymentCardProps) {
  const { index, position, removePayment, register } = props;

  function handleDeletePayment() {
    removePayment(index);
  }

  return (
    <NewPaymentCardContainer>
      <header>
        <span>Pagamento {position}</span>
        <DeletePaymentButton>
          <Trash size={24} onClick={handleDeletePayment} />
        </DeletePaymentButton>
      </header>
      <NewPaymentCardContent>
        <input type="date" placeholder="Data" required {...register(`payments.${index}.date`, { valueAsDate: true })} />
        <input
          type="number"
          placeholder="Valor"
          required
          {...register(`payments.${index}.value`, { valueAsNumber: true })}
        />
      </NewPaymentCardContent>
    </NewPaymentCardContainer>
  );
}
