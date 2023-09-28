import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryContainer, SummaryCard } from "./styles";

export function Summary() {
  return (
    <SummaryContainer>
      <SummaryCard variant="green">
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#58B22D" />
        </header>

        <strong>R$ 17.400,00</strong>
      </SummaryCard>

      <SummaryCard variant="red">
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#EB6B57" />
        </header>

        <strong>R$ 1.400,00</strong>
      </SummaryCard>

      <SummaryCard variant="blue">
        <header>
          <span>Saldo</span>
          <CurrencyDollar size={32} color="#60A0B7" />
        </header>

        <strong>R$ 16.000,00</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
