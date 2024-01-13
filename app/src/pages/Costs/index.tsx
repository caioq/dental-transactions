import { ArrowCircleDown } from "phosphor-react";

import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { TransactionsContainer, TransactionsTitle } from "./styles";

export function Costs() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <TransactionsTitle>
          <ArrowCircleDown size={28} />
          <span>Custos:</span>
        </TransactionsTitle>
        <SearchForm />
      </TransactionsContainer>
    </div>
  );
}
