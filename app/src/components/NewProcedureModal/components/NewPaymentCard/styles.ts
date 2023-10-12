import styled from "styled-components";

export const NewPaymentCardContainer = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme["gray-100"]};
  border-radius: 6px;
  padding: 0.5rem;

  flex-direction: row;
  align-items: center;

  header {
    display: flex;
    justify-content: space-between;

    font-size: 1rem;
    color: ${(props) => props.theme["text-title"]};

    margin: 1rem 0.5rem 1rem 0.5rem;
  }
`;

export const DeletePaymentButton = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme["red-300"]};
`;

export const NewPaymentCardContent = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 0.5rem;
`;
