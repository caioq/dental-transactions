import styled from "styled-components";

export const SignInContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme["blue-back"]};
`;

export const SignInContent = styled.div`
  background: white;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 4.5rem 3.5rem;
  min-width: 21rem;
  max-width: 32rem;
  width: 50%;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  form {
    width: 100%;
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

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    margin-left: 0.5rem;
    color: ${(props) => props.theme["blue-dark"]};
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
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["blue-bright-700"]};
    transition: background-color 0.2s;
  }
`;
