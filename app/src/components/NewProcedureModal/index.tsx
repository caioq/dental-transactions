import { useContext } from "react";
import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon } from "@radix-ui/react-icons";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  CloseButton,
  Content,
  Overlay,
  PaymentToReceiveCheckbox,
  PaymentToReceiveCheckboxButton,
  PaymentToReceiveCheckboxIndicator,
} from "./styles";
import { ProceduresContext } from "../../contexts/ProceduresContext";

const newProcedureFormSchema = z.object({
  date: z.date(),
  patientName: z.string().nullable(),
  cpf: z.string().nullable(),
  category: z.string().min(1),
  billing: z.number().positive(),
  invoice: z.number().positive(),
  isPaymentToBeReceived: z.boolean(),
});

type NewProcedureFormInputs = z.infer<typeof newProcedureFormSchema>;

interface NewProcedureModalProps {
  setOpenDialog: (open: boolean) => void;
}

export function NewProcedureModal(props: NewProcedureModalProps) {
  const { setOpenDialog } = props;
  const { createProcedure } = useContext(ProceduresContext);
  const { register, handleSubmit, reset, control } = useForm<NewProcedureFormInputs>({
    defaultValues: {
      isPaymentToBeReceived: true,
    },
  });

  async function handleCreateNewProcedure(data: NewProcedureFormInputs) {
    console.log(data);
    await createProcedure({
      invoice: Number(data.invoice),
      billing: Number(data.billing),
      category: data.category,
      date: new Date(data.date),
      cpf: data.cpf || null,
      patientName: data.patientName || null,
      payment: data.isPaymentToBeReceived ? 0 : Number(data.invoice),
    });

    reset();
    setOpenDialog(false);
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Novo Procedimento</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewProcedure)}>
          <input type="date" placeholder="Data" required {...register("date")} />
          <input type="text" placeholder="Nome do paciente" {...register("patientName")} />
          <input type="text" placeholder="CPF" {...register("cpf")} />
          <input type="text" placeholder="Procedimento" required {...register("category")} />
          <input type="number" placeholder="Orçamento" required {...register("billing", { valueAsNumber: true })} />
          <input type="number" placeholder="Faturamento" required {...register("invoice", { valueAsNumber: true })} />

          <Controller
            control={control}
            name="isPaymentToBeReceived"
            render={({ field }) => (
              <PaymentToReceiveCheckbox>
                <PaymentToReceiveCheckboxButton onCheckedChange={field.onChange} checked={field.value}>
                  <PaymentToReceiveCheckboxIndicator>
                    <CheckIcon />
                  </PaymentToReceiveCheckboxIndicator>
                </PaymentToReceiveCheckboxButton>
                <label>Pagamento à receber</label>
              </PaymentToReceiveCheckbox>
            )}
          />

          <button type="submit">Adicionar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
