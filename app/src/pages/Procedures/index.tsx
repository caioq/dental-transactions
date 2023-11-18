import { useContext, useState } from "react";
import { ArrowCircleUp } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { ProcedureCard } from "./components/ProcedureCard";
import {
  TransactionsContainer,
  TransactionsTable,
  TransactionsTitle,
  PriceHighlight,
  TransactionsTableContainer,
  TransactionsCardsContainer,
  DialogTrigger,
} from "./styles";
import { Procedure, ProceduresContext } from "../../contexts/ProceduresContext";
import { currencyFormatter, dateFormatter, percentFormatter } from "../../utils";
import { NewProcedureModal } from "../../components/NewProcedureModal";
import { Skeleton } from "../../components/core/Skeleton";
import { EmptyState } from "./components/EmptyState";

export function Procedures() {
  const { procedures, loading } = useContext(ProceduresContext);

  const [open, setOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);

  function handleSelectProcedure(procedure: Procedure) {
    setSelectedProcedure(procedure);
  }

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTitle>
          <ArrowCircleUp size={28} />
          <span>Últimos procedimentos:</span>
        </TransactionsTitle>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <TransactionsTableContainer>
            <TransactionsTable>
              {loading ? (
                <Skeleton height={65} />
              ) : procedures.length === 0 ? (
                <EmptyState />
              ) : (
                <tbody>
                  {procedures.map((procedure, index) => (
                    <DialogTrigger key={index} onClick={() => handleSelectProcedure(procedure)}>
                      <tr key={index}>
                        <td>{procedure.patientName || "Desconhecido"}</td>
                        <td>{currencyFormatter.format(procedure.billing)}</td>
                        <td>
                          {currencyFormatter.format(procedure.invoice)} (
                          {percentFormatter.format(procedure.percentToReceive)})
                        </td>
                        <td>
                          <PriceHighlight variant="income">
                            {currencyFormatter.format(procedure.totalPaid)}
                          </PriceHighlight>
                        </td>
                        <td>{procedure.category.name}</td>
                        <td>{dateFormatter.format(new Date(procedure.date))}</td>
                      </tr>
                    </DialogTrigger>
                  ))}
                </tbody>
              )}
            </TransactionsTable>
          </TransactionsTableContainer>
          <TransactionsCardsContainer>
            {loading ? (
              <Skeleton height={150} />
            ) : procedures.length === 0 ? (
              <EmptyState />
            ) : (
              procedures.map((procedure, index) => (
                <DialogTrigger key={index} onClick={() => handleSelectProcedure(procedure)}>
                  <ProcedureCard
                    key={index}
                    date={dateFormatter.format(new Date(procedure.date))}
                    name={procedure.patientName}
                    paidValue={currencyFormatter.format(procedure.totalPaid)}
                    procedureType={procedure.category.name}
                    invoice={currencyFormatter.format(procedure.invoice)}
                    percentToReceive={percentFormatter.format(procedure.percentToReceive)}
                    billing={currencyFormatter.format(procedure.billing)}
                  />
                </DialogTrigger>
              ))
            )}
          </TransactionsCardsContainer>
          <NewProcedureModal setOpenDialog={setOpen} initialValues={selectedProcedure} />
        </Dialog.Root>
      </TransactionsContainer>
    </div>
  );
}
