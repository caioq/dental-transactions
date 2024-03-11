import { CalendarBlank, TagSimple } from "phosphor-react";
import { CostCardContainer, CostCardFooter, CostValuesContent, CostValuesLeft } from "./styles";

interface CostCardProps {
  description: string;
  category: string;
  date: string;
  value: string;
  installments: number;
  installmentValue: string;
}

export function CostCard({ description, date, value, installmentValue, installments, category }: CostCardProps) {
  return (
    <CostCardContainer>
      <header>
        <span>{description}</span>
      </header>
      <CostValuesContent>
        <CostValuesLeft>
          <label>Total</label>
          <span>{value}</span>
          <label>Parcelas</label>
          <span>{installments}</span>
        </CostValuesLeft>
        <strong>{installmentValue}</strong>
      </CostValuesContent>
      <CostCardFooter>
        <div>
          <TagSimple size={16} />
          <span>{category}</span>
        </div>
        <div>
          <CalendarBlank size={16} />
          <span>{date}</span>
        </div>
      </CostCardFooter>
    </CostCardContainer>
  );
}
