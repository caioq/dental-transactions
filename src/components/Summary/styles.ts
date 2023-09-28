import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`;

interface SummaryCardProps {
  variant?: "green" | "red" | "blue";
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme["white"]};
  border-radius: 6px;
  padding: 1.5rem 2rem;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme["text-base"]};
  }

  strong {
    display: block;
    margin-top: 1.5rem;
    font-size: 2rem;
    color: ${(props) => props.theme["text-title"]};
  }

  ${(props) =>
    props.variant === "green" &&
    css`
      border-top: 6px solid ${props.theme["green-dark"]};
    `}

  ${(props) =>
    props.variant === "red" &&
    css`
      border-top: 6px solid ${props.theme["red-dark"]};
    `}

    ${(props) =>
    props.variant === "blue" &&
    css`
      border-top: 6px solid ${props.theme["blue-dark"]};
    `}
`;
