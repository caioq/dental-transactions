import { CalendarBlank, TagSimple } from "phosphor-react";
import { ProcedureCardContainer, ProcedureCardFooter, ProcedureValuesContent, ProcedureValuesLeft } from "./styles";

interface ProcedureCardProps {
  name: string;
  totalValue: string;
  toReceiveValue: string;
  percentToReceive: string;
  paidValue: string;
  procedureType: string;
  date: string;
}

export function ProcedureCard({
  name,
  toReceiveValue,
  percentToReceive,
  totalValue,
  date,
  paidValue,
  procedureType,
}: ProcedureCardProps) {
  return (
    <ProcedureCardContainer>
      <header>
        <span>{name}</span>
      </header>
      <ProcedureValuesContent>
        <ProcedureValuesLeft>
          <label>Total</label>
          <span>{totalValue}</span>
          <label>À Receber</label>
          <span>
            {toReceiveValue} ({percentToReceive})
          </span>
        </ProcedureValuesLeft>
        <strong>{paidValue}</strong>
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
