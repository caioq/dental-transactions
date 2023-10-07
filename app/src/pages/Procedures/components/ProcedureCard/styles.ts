import styled from "styled-components";

export const ProcedureCardContainer = styled.div`
  width: 100%;
  /* max-width: 320px; */
  background-color: ${(props) => props.theme["gray-background"]};
  border-radius: 6px;
  padding: 1.5rem;
  color: ${(props) => props.theme["text-base"]};

  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  header {
    font-size: 1.1rem;
    color: ${(props) => props.theme["text-base"]};
  }
`;

export const ProcedureValuesContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 1.5rem;
    color: ${(props) => props.theme["green-alt"]};
  }
`;

export const ProcedureValuesLeft = styled.div`
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

export const ProcedureCardFooter = styled.div`
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
