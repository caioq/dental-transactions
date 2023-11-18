import { useContext, useEffect } from "react";
import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Procedure, ProceduresContext } from "../../contexts/ProceduresContext";
import { CloseButton, Content, Overlay, PrimaryButton, SecondaryButton } from "./styles";
import { NewPaymentCard } from "./components/NewPaymentCard";
import { NewProcedureFormInputs } from "./types";
import { CategorySelectInput } from "./components/SelectCategoryInput";
import { dateToInputDate } from "../../utils";
import { CurrencyInput } from "../core/CurrencyInput";
import { parseCurrencyToFloat, parseFloatToString } from "../../utils/parser";

interface NewProcedureModalProps {
  setOpenDialog: (open: boolean) => void;
  initialValues?: Procedure | null;
}

export function NewProcedureModal(props: NewProcedureModalProps) {
  const { setOpenDialog, initialValues } = props;
  const { categories, createProcedure, updateProcedure } = useContext(ProceduresContext);

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

  async function handleSubmitProcedure(data: NewProcedureFormInputs) {
    console.log(data);
    if (isCreateMode) {
      await createProcedure({
        invoice: data.invoice,
        billing: Number(data.billing),
        categoryId: data.categoryId,
        date: new Date(data.date),
        cpf: data.cpf || null,
        patientName: data.patientName || null,
        payments: data.payments,
      });
    } else {
      await updateProcedure({
        id: initialValues?.id,
        invoice: data.invoice,
        billing: Number(data.billing),
        categoryId: data.categoryId,
        date: new Date(data.date),
        cpf: data.cpf || null,
        patientName: data.patientName || null,
        payments: data.payments,
      });
    }

    reset();
    setOpenDialog(false);
  }

  function handleClickAddPayment() {
    prepend({
      date: dateToInputDate(new Date()),
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

        <form onSubmit={handleSubmit(handleSubmitProcedure)}>
          <input type="date" placeholder="Data" required {...register("date", { valueAsDate: true })} />
          <input type="text" placeholder="Nome do paciente" {...register("patientName")} />
          <input type="text" placeholder="CPF" {...register("cpf")} />
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <CategorySelectInput
                categories={categories}
                required
                onChange={field.onChange}
                defaultValue={initialValues?.category.id ?? ""}
              />
            )}
          />

          <Controller
            control={control}
            name="billing"
            render={({ field }) => (
              <CurrencyInput
                placeholder="Orçamento"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(parseCurrencyToFloat(event.target.value))
                }
                value={parseFloatToString(field.value)}
                required
              />
            )}
          />
          <Controller
            control={control}
            name="invoice"
            render={({ field }) => (
              <CurrencyInput
                placeholder="Faturamento"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(parseCurrencyToFloat(event.target.value))
                }
                value={parseFloatToString(field.value)}
                required
              />
            )}
          />

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
              control={control}
            />
          ))}

          <PrimaryButton type="submit">{isCreateMode ? "Cadastrar" : "Salvar"}</PrimaryButton>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
