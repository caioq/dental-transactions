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

  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface SummaryCardProps {
  variant?: "green" | "red" | "blue";
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme["white"]};
  border-radius: 6px;
  padding: 1.5rem 2rem;
  min-width: 14rem;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.3rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme["text-base"]};
  }

  div {
    display: block;
    margin-top: 1.5rem;
    font-size: 1.5rem;
    color: ${(props) => props.theme["text-title"]};

    @media only screen and (min-width: 768px) {
      font-size: 2rem;
    }
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
