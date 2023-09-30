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

export function Procedures() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTitle>Últimos procedimentos:</TransactionsTitle>
        <TransactionsTableContainer>
          <TransactionsTable>
            <tbody>
              <tr>
                <td>Gabriela</td>
                <td>R$ 15.000,00</td>
                <td>R$ 9.000,00 (60%)</td>
                <td>
                  <PriceHighlight variant="income">R$ 2.000,00</PriceHighlight>
                </td>
                <td>Profilaxia/Raspagem</td>
                <td>13/04/2022</td>
              </tr>
              <tr>
                <td>Gabriela</td>
                <td>R$ 15.000,00</td>
                <td>R$ 9.000,00 (60%)</td>
                <td>
                  <PriceHighlight variant="income">R$ 2.000,00</PriceHighlight>
                </td>
                <td>Profilaxia/Raspagem</td>
                <td>13/04/2022</td>
              </tr>
              <tr>
                <td>Gabriela</td>
                <td>R$ 15.000,00</td>
                <td>R$ 9.000,00 (60%)</td>
                <td>
                  <PriceHighlight variant="income">R$ 2.000,00</PriceHighlight>
                </td>
                <td>Profilaxia/Raspagem</td>
                <td>13/04/2022</td>
              </tr>
            </tbody>
          </TransactionsTable>
        </TransactionsTableContainer>
        <TransactionsCardsContainer>
          <ProcedureCard
            date="13/04/2022"
            name="Gabriela"
            paidValue={12000}
            procedureType="Profilaxia/Raspagem"
            toReceiveValue={90000}
            totalValue={15000}
          />
          <ProcedureCard
            date="13/04/2022"
            name="Gabriela"
            paidValue={12000}
            procedureType="Profilaxia/Raspagem"
            toReceiveValue={90000}
            totalValue={15000}
          />
          <ProcedureCard
            date="13/04/2022"
            name="Gabriela"
            paidValue={12000}
            procedureType="Profilaxia/Raspagem"
            toReceiveValue={90000}
            totalValue={15000}
          />
        </TransactionsCardsContainer>
      </TransactionsContainer>
    </div>
  );
}
