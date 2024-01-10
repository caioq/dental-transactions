import styled from "styled-components";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const TransactionsTitle = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme["text-title"]};
  font-weight: 700;

  display: flex;
  align-items: center;
  gap: 0.2rem;
`;
