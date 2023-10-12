import { ArrowCircleUp } from "phosphor-react";
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
import { useContext } from "react";
import { ProceduresContext } from "../../contexts/ProceduresContext";
import { currencyFormatter, dateFormatter, percentFormatter } from "../../utils/formatter";

export function Procedures() {
  const { procedures } = useContext(ProceduresContext);

  function calculatePercentToReceive(invoice: number, billing: number): number {
    return invoice / billing;
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
            <tbody>
              {procedures.map((procedure, index) => (
                <tr key={index}>
                  <td>{procedure.patientName || "Desconhecido"}</td>
                  <td>{currencyFormatter.format(procedure.billing)}</td>
                  <td>
                    {currencyFormatter.format(procedure.invoice)} (
                    {percentFormatter.format(calculatePercentToReceive(procedure.invoice, procedure.billing))})
                  </td>
                  <td>
                    <PriceHighlight variant="income">{currencyFormatter.format(procedure.payment)}</PriceHighlight>
                  </td>
                  <td>{procedure.category}</td>
                  <td>{dateFormatter.format(new Date(procedure.date))}</td>
                </tr>
              ))}
            </tbody>
          </TransactionsTable>
        </TransactionsTableContainer>
        <TransactionsCardsContainer>
          {procedures.map((procedure, index) => (
            <ProcedureCard
              key={index}
              date="13/04/2022"
              name={procedure.patientName}
              paidValue={currencyFormatter.format(procedure.payment)}
              procedureType={procedure.category}
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
