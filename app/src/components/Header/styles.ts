import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme["blue-back"]};
  padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    margin-left: 0.5rem;
    color: ${(props) => props.theme["white"]};
  }
`;

export const NewProceduresButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["blue-bright"]};
  color: ${(props) => props.theme["white"]};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["blue-bright-700"]};
    transition: background-color 0.2s;
  }
`;
