import styled from "styled-components";

export const MyAccountContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`;

export const MyAccountTitle = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme["text-title"]};
  font-weight: 700;

  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export const MyAccountContent = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const ChangePasswordContent = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-background"]};
      color: ${(props) => props.theme["text-title"]};
      padding: 1rem;
      &::placeholder {
        color: ${(props) => props.theme["text-placeholder"]};
      }
    }
  }
`;

export const PrimaryButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["blue-dark"]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["blue-bright-700"]};
    transition: background-color 0.2s;
  }
`;
