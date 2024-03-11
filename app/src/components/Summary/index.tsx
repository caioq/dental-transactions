import { useContext, useMemo } from "react";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryContainer, SummaryCard } from "./styles";
import { ProceduresContext, Payment, Cost } from "../../contexts/ProceduresContext";
import { currencyFormatter } from "../../utils/formatter";
import { Skeleton } from "../core/Skeleton";

export function Summary() {
  const { payments, loadingPayments, costs } = useContext(ProceduresContext);

  function calculateIncome(payments: Payment[]): number {
    return payments.reduce((acc, payment) => (acc += payment.value), 0);
  }

  function calculateOutcome(costs: Cost[]): number {
    return costs.reduce((acc, cost) => (acc += cost.installmentValue), 0);
  }

  const income = useMemo(() => calculateIncome(payments), [payments]);
  const outcome = useMemo(() => calculateOutcome(costs), [costs]);
  const balance = useMemo(() => income - outcome, [income, outcome]);

  return (
    <SummaryContainer>
      <SummaryCard variant="green">
        <header>
          <span>Entradas</span>
          <ArrowCircleDown size={32} color="#58B22D" />
        </header>

        <div>{loadingPayments ? <Skeleton width={170} /> : <strong>{currencyFormatter.format(income)}</strong>}</div>
      </SummaryCard>

      <SummaryCard variant="red">
        <header>
          <span>Saídas</span>
          <ArrowCircleUp size={32} color="#EB6B57" />
        </header>

        <div>{loadingPayments ? <Skeleton width={170} /> : <strong>{currencyFormatter.format(outcome)}</strong>}</div>
      </SummaryCard>

      <SummaryCard variant="blue">
        <header>
          <span>Saldo</span>
          <CurrencyDollar size={32} color="#60A0B7" />
        </header>

        <div>{loadingPayments ? <Skeleton width={170} /> : <strong>{currencyFormatter.format(balance)}</strong>}</div>
      </SummaryCard>
    </SummaryContainer>
  );
}
