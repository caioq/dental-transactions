import { CalendarBlank, TagSimple } from "phosphor-react";
import { CostCardContainer, CostCardFooter, CostValuesContent } from "./styles";

interface CostCardProps {
  description: string;
  category: string;
  date: string;
  value: string;
}

export function CostCard({ description, date, value, category }: CostCardProps) {
  return (
    <CostCardContainer>
      <CostValuesContent>
        <span>{description}</span>
        <strong>{value}</strong>
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
