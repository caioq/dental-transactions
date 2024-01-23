import { useContext, useEffect } from "react";
import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Controller, useForm } from "react-hook-form";

import { Cost, ProceduresContext } from "../../contexts/ProceduresContext";
import { CloseButton, Content, Overlay, PrimaryButton } from "./styles";
import { NewCostFormInputs } from "./types";
import { CategorySelectInput } from "./components/SelectCategoryInput";
import { dateToInputDate } from "../../utils";
import { CurrencyInput } from "../core/CurrencyInput";
import { parseCurrencyToFloat, parseFloatToString } from "../../utils/parser";

interface NewCostModalProps {
  setOpenDialog: (open: boolean) => void;
  initialValues?: Cost | null;
}

export function NewCostModal(props: NewCostModalProps) {
  const { setOpenDialog, initialValues } = props;
  const { costCategories, createCost, updateCost } = useContext(ProceduresContext);

  const isCreateMode = !initialValues?.id;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<NewCostFormInputs>({
    defaultValues: {
      date: dateToInputDate(new Date()),
    },
  });

  useEffect(() => {
    if (!isCreateMode) {
      reset({
        ...initialValues,
        categoryId: initialValues.category.id,
        date: dateToInputDate(new Date(initialValues.date)),
      });
    }
  }, [initialValues, isCreateMode, reset]);

  async function handleSubmitCost(data: NewCostFormInputs) {
    console.log(data);
    if (isCreateMode) {
      try {
        await createCost({
          value: Number(data.value),
          categoryId: data.categoryId,
          date: new Date(data.date),
          description: data.description || null,
        });
      } catch (error) {
        alert("Erro ao criar custo");
      }
    } else {
      try {
        await updateCost({
          id: initialValues?.id,
          value: Number(data.value),
          categoryId: data.categoryId,
          date: new Date(data.date),
          description: data.description || null,
        });
      } catch (error) {
        alert("Erro ao atualizar custo");
      }
    }

    reset();
    setOpenDialog(false);
  }

  function clearForm() {
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content onOpenAutoFocus={clearForm}>
        <Dialog.Title>{isCreateMode ? "Novo Custo" : "Editar Custo"}</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleSubmitCost)}>
          <input type="date" placeholder="Data" required {...register("date", { valueAsDate: true })} />
          <input type="text" placeholder="Descrição" {...register("description")} />
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <CategorySelectInput
                categories={costCategories}
                required
                onChange={field.onChange}
                defaultValue={initialValues?.category.id ?? ""}
              />
            )}
          />

          <Controller
            control={control}
            name="value"
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

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isCreateMode ? "Cadastrar" : "Salvar"}
          </PrimaryButton>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
