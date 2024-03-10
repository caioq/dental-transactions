import styled from "styled-components";

export const CostCardContainer = styled.div`
  width: 100%;
  /* max-width: 320px; */
  background-color: ${(props) => props.theme["gray-background"]};
  border-radius: 6px;
  padding: 1.5rem;
  color: ${(props) => props.theme["text-base"]};

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CostValuesContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 1.5rem;
    color: ${(props) => props.theme["red-300"]};
  }

  span {
    font-size: 1.1rem;
  }
`;

export const CostValuesLeft = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-top: 1rem; */

  label {
    font-size: 0.8rem;
    color: ${(props) => props.theme["text-placeholder"]};
  }

  span {
    font-size: 1rem;
  }
`;

export const CostCardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`;
