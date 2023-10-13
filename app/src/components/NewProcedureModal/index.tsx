import { useContext } from "react";
import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useFieldArray, useForm } from "react-hook-form";
import { CloseButton, Content, Overlay } from "./styles";
import { ProceduresContext } from "../../contexts/ProceduresContext";
import { NewPaymentCard } from "./components/NewPaymentCard";
import { NewProcedureFormInputs } from "./types";

interface NewProcedureModalProps {
  setOpenDialog: (open: boolean) => void;
}

export function NewProcedureModal(props: NewProcedureModalProps) {
  const { setOpenDialog } = props;
  const { createProcedure } = useContext(ProceduresContext);
  const { register, handleSubmit, reset, control } = useForm<NewProcedureFormInputs>({
    defaultValues: {
      payments: [],
    },
  });
  const {
    fields: paymentFields,
    prepend,
    remove,
  } = useFieldArray({
    control,
    name: "payments",
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
      payments: data.payments,
    });

    reset();
    setOpenDialog(false);
  }

  function handleClickAddPayment() {
    prepend({
      date: new Date(),
      value: 0,
    });
  }

  function clearForm() {
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content onOpenAutoFocus={clearForm}>
        <Dialog.Title>Novo Procedimento</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewProcedure)}>
          <input type="date" placeholder="Data" required {...register("date", { valueAsDate: true })} />
          <input type="text" placeholder="Nome do paciente" {...register("patientName")} />
          <input type="text" placeholder="CPF" {...register("cpf")} />
          <input type="text" placeholder="Procedimento" required {...register("category")} />
          <input type="number" placeholder="Orçamento" required {...register("billing", { valueAsNumber: true })} />
          <input type="number" placeholder="Faturamento" required {...register("invoice", { valueAsNumber: true })} />

          <button type="button" onClick={handleClickAddPayment}>
            + Adicionar Pagamento
          </button>

          {paymentFields.map((item, index) => (
            <NewPaymentCard
              key={item.id}
              index={index}
              position={paymentFields.length - index}
              removePayment={remove}
              register={register}
            />
          ))}

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
