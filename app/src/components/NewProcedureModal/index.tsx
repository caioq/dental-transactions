import { useContext, useEffect } from "react";
import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Procedure, ProceduresContext } from "../../contexts/ProceduresContext";
import { CloseButton, Content, Overlay, PrimaryButton, SecondaryButton } from "./styles";
import { NewPaymentCard } from "./components/NewPaymentCard";
import { NewProcedureFormInputs } from "./types";
import { CategorySelectInput } from "./components/SelectCategoryInput";

interface NewProcedureModalProps {
  setOpenDialog: (open: boolean) => void;
  initialValues?: Procedure | null;
}

function dateToInputDate(date?: Date) {
  if (!date || !!isNaN(date.getTime())) {
    return undefined;
  }
  return date.toJSON().slice(0, 10) as unknown as Date;
}

export function NewProcedureModal(props: NewProcedureModalProps) {
  const { setOpenDialog, initialValues } = props;
  const { createProcedure, categories } = useContext(ProceduresContext);

  const isCreateMode = !initialValues?.id;

  const { register, handleSubmit, reset, control } = useForm<NewProcedureFormInputs>({
    defaultValues: {
      date: dateToInputDate(new Date()),
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

  useEffect(() => {
    if (!isCreateMode) {
      console.log(initialValues);
      reset({
        ...initialValues,
        categoryId: initialValues.category.id,
        date: dateToInputDate(new Date(initialValues.date)),
        payments: initialValues.payments.map((payment) => ({
          ...payment,
          date: dateToInputDate(new Date(payment.date)),
        })),
      });
    }
  }, [initialValues, isCreateMode, reset]);

  async function handleCreateNewProcedure(data: NewProcedureFormInputs) {
    console.log(data);
    await createProcedure({
      invoice: Number(data.invoice),
      billing: Number(data.billing),
      categoryId: data.categoryId,
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
        <Dialog.Title>{isCreateMode ? "Novo Procedimento" : "Editar Procedimento"}</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewProcedure)}>
          <input type="date" placeholder="Data" required {...register("date", { valueAsDate: true })} />
          <input type="text" placeholder="Nome do paciente" {...register("patientName")} />
          <input type="text" placeholder="CPF" {...register("cpf")} />
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => <CategorySelectInput categories={categories} required onChange={field.onChange} />}
          />
          <input type="number" placeholder="Orçamento" required {...register("billing", { valueAsNumber: true })} />
          <input type="number" placeholder="Faturamento" required {...register("invoice", { valueAsNumber: true })} />

          <SecondaryButton type="button" onClick={handleClickAddPayment}>
            + Adicionar Pagamento
          </SecondaryButton>

          {paymentFields.map((item, index) => (
            <NewPaymentCard
              key={item.id}
              index={index}
              position={paymentFields.length - index}
              removePayment={remove}
              register={register}
            />
          ))}

          <PrimaryButton type="submit">{isCreateMode ? "Cadastrar" : "Salvar"}</PrimaryButton>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
