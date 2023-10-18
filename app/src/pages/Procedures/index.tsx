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
} from "./styles";
import { Procedure, ProceduresContext } from "../../contexts/ProceduresContext";
import { currencyFormatter, dateFormatter, percentFormatter } from "../../utils";
import { NewProcedureModal } from "../../components/NewProcedureModal";

export function Procedures() {
  const { procedures } = useContext(ProceduresContext);

  const [open, setOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);

  function calculatePercentToReceive(invoice: number, billing: number): number {
    return invoice / billing;
  }

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
        <TransactionsTableContainer>
          <TransactionsTable>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <tbody>
                {procedures.map((procedure, index) => (
                  <Dialog.Trigger key={index} asChild onClick={() => handleSelectProcedure(procedure)}>
                    <tr key={index}>
                      <td>{procedure.patientName || "Desconhecido"}</td>
                      <td>{currencyFormatter.format(procedure.billing)}</td>
                      <td>
                        {currencyFormatter.format(procedure.invoice)} (
                        {percentFormatter.format(calculatePercentToReceive(procedure.invoice, procedure.billing))})
                      </td>
                      <td>
                        <PriceHighlight variant="income">{currencyFormatter.format(0)}</PriceHighlight>
                      </td>
                      <td>{procedure.category.name}</td>
                      <td>{dateFormatter.format(new Date(procedure.date))}</td>
                    </tr>
                  </Dialog.Trigger>
                ))}
              </tbody>
              <NewProcedureModal setOpenDialog={setOpen} initialValues={selectedProcedure} />
            </Dialog.Root>
          </TransactionsTable>
        </TransactionsTableContainer>
        <TransactionsCardsContainer>
          {procedures.map((procedure, index) => (
            <ProcedureCard
              key={index}
              date="13/04/2022"
              name={procedure.patientName}
              // paidValue={currencyFormatter.format(procedure.payment)}
              paidValue={currencyFormatter.format(0)}
              procedureType={procedure.category.name}
              toReceiveValue={currencyFormatter.format(procedure.invoice)}
              percentToReceive={percentFormatter.format(procedure.percentToReceive)}
              totalValue={currencyFormatter.format(procedure.billing)}
            />
          ))}
        </TransactionsCardsContainer>
      </TransactionsContainer>
    </div>
  );
}
