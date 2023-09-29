import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  PaymentToReceiveCheckbox,
  PaymentToReceiveCheckboxButton,
  PaymentToReceiveCheckboxIndicator,
} from "./styles";
import { CheckIcon } from "@radix-ui/react-icons";

export function ProcedureModal() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Novo Procedimento</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form>
          <input type="date" placeholder="Data" required />
          <input type="text" placeholder="Nome do paciente" />
          <input type="text" placeholder="CPF" />
          <input type="text" placeholder="Procedimento" required />
          <input type="number" placeholder="Orçamento" required />
          <input type="number" placeholder="Faturamento" required />

          <PaymentToReceiveCheckbox>
            <PaymentToReceiveCheckboxButton>
              <PaymentToReceiveCheckboxIndicator>
                <CheckIcon />
              </PaymentToReceiveCheckboxIndicator>
            </PaymentToReceiveCheckboxButton>
            <label>Pagamento à receber</label>
          </PaymentToReceiveCheckbox>

          <button type="submit">Adicionar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
