import { useContext, useMemo } from "react";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryContainer, SummaryCard } from "./styles";
import { ProceduresContext, Payment } from "../../contexts/ProceduresContext";
import { currencyFormatter } from "../../utils/formatter";

export function Summary() {
  const { payments } = useContext(ProceduresContext);

  function calculateIncome(payments: Payment[]): number {
    return payments.reduce((acc, payment) => (acc += payment.value), 0);
  }

  const income = useMemo(() => calculateIncome(payments), [payments]);
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
