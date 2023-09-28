import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { TransactionsContainer, TransactionsTable, PriceHighlight } from "./styles";

export function Procedures() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
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
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
