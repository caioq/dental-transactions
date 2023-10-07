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
              {procedures.map((procedure) => (
                <tr>
                  <td>{procedure.patientName}</td>
                  <td>{currencyFormatter.format(procedure.value)}</td>
                  <td>
                    {currencyFormatter.format(procedure.toReceiveValue)} (
                    {percentFormatter.format(procedure.percentToReceive)})
                  </td>
                  <td>
                    <PriceHighlight variant="income">{currencyFormatter.format(procedure.paidValue)}</PriceHighlight>
                  </td>
                  <td>{procedure.category}</td>
                  <td>{dateFormatter.format(new Date(procedure.createdAt))}</td>
                </tr>
              ))}
            </tbody>
          </TransactionsTable>
        </TransactionsTableContainer>
        <TransactionsCardsContainer>
          {procedures.map((procedure) => (
            <ProcedureCard
              date="13/04/2022"
              name={procedure.patientName}
              paidValue={currencyFormatter.format(procedure.paidValue)}
              procedureType={procedure.category}
              toReceiveValue={currencyFormatter.format(procedure.toReceiveValue)}
              percentToReceive={percentFormatter.format(procedure.percentToReceive)}
              totalValue={currencyFormatter.format(procedure.value)}
            />
          ))}
        </TransactionsCardsContainer>
      </TransactionsContainer>
    </div>
  );
}
