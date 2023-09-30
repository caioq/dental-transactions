import styled from "styled-components";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const TransactionsTitle = styled.span`
  font-size: 1.5rem;
  color: ${(props) => props.theme["text-title"]};
  font-weight: 700;
`;

export const TransactionsTableContainer = styled.div`
  margin-top: 1rem;
  display: none;

  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

export const TransactionsCardsContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme["gray-background"]};
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

interface PriceHighlightProps {
  variant: "income" | "outcome";
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) => (props.variant === "income" ? props.theme["green-dark"] : props.theme["text-base"])};
`;
