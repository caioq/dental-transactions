import { useContext, useMemo } from "react";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryContainer, SummaryCard } from "./styles";
import { ProceduresContext, Procedure } from "../../contexts/ProceduresContext";
import { currencyFormatter } from "../../utils/formatter";

function calculateIncome(procedures: Procedure[]): number {
  return procedures.reduce((acc, procedure) => (acc += procedure.payment), 0);
}

export function Summary() {
  const { procedures } = useContext(ProceduresContext);

  const income = useMemo(() => calculateIncome(procedures), [procedures]);
  const outcome = 0;
  const balance = useMemo(() => income - outcome, [income, outcome]);

  return (
    <SummaryContainer>
      <SummaryCard variant="green">
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#58B22D" />
        </header>

        <strong>{currencyFormatter.format(income)}</strong>
      </SummaryCard>

      <SummaryCard variant="red">
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#EB6B57" />
        </header>

        <strong>{currencyFormatter.format(outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="blue">
        <header>
          <span>Saldo</span>
          <CurrencyDollar size={32} color="#60A0B7" />
        </header>

        <strong>{currencyFormatter.format(balance)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
