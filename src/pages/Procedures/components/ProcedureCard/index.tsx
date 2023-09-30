import { CalendarBlank, TagSimple } from "phosphor-react";
import { ProcedureCardContainer, ProcedureCardFooter, ProcedureValuesContent, ProcedureValuesLeft } from "./styles";

interface ProcedureCardProps {
  name: string;
  totalValue: number;
  toReceiveValue: number;
  paidValue: number;
  procedureType: string;
  date: string;
}

export function ProcedureCard({
  name,
  toReceiveValue,
  totalValue,
  date,
  paidValue,
  procedureType,
}: ProcedureCardProps) {
  const percentToReceive = (toReceiveValue / totalValue) * 100;

  return (
    <ProcedureCardContainer>
      <header>
        <span>{name}</span>
      </header>
      <ProcedureValuesContent>
        <ProcedureValuesLeft>
          <label>Total</label>
          <span>R$ {totalValue}</span>
          <label>À Receber</label>
          <span>
            R$ {toReceiveValue} ({percentToReceive}%)
          </span>
        </ProcedureValuesLeft>
        <strong>R$ {paidValue}</strong>
      </ProcedureValuesContent>
      <ProcedureCardFooter>
        <div>
          <TagSimple size={16} />
          <span>{procedureType}</span>
        </div>
        <div>
          <CalendarBlank size={16} />
          <span>{date}</span>
        </div>
      </ProcedureCardFooter>
    </ProcedureCardContainer>
  );
}
