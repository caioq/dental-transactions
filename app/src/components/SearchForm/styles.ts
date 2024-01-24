import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme["blue-dark"]};
    background: ${(props) => props.theme["white"]};
    color: ${(props) => props.theme["text-base"]};
    padding: 1rem;
    &::placeholder {
      color: ${(props) => props.theme["text-placeholder"]};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme["blue-dark"]};
    color: ${(props) => props.theme["blue-dark"]};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme["blue-bright-700"]};
      border-color: ${(props) => props.theme["blue-bright-700"]};
      color: ${(props) => props.theme["white"]};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`;
