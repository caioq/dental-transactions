import { Trash } from "phosphor-react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { DeletePaymentButton, NewPaymentCardContainer, NewPaymentCardContent } from "./styles";
import { NewProcedureFormInputs } from "../../types";
import { CurrencyInput } from "../../../core/CurrencyInput";
import { parseCurrencyToFloat, parseFloatToString } from "../../../../utils/parser";

interface NewPaymentCardProps {
  index: number;
  position: number;
  removePayment: (index: number) => void;
  register: UseFormRegister<NewProcedureFormInputs>;
  control: Control<NewProcedureFormInputs>;
}

export function NewPaymentCard(props: NewPaymentCardProps) {
  const { index, position, removePayment, register, control } = props;

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
        <Controller
          control={control}
          name={`payments.${index}.value`}
          render={({ field }) => (
            <CurrencyInput
              placeholder="Valor"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(parseCurrencyToFloat(event.target.value))
              }
              value={parseFloatToString(field.value)}
              required
            />
          )}
        />
      </NewPaymentCardContent>
    </NewPaymentCardContainer>
  );
}
