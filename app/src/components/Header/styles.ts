import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme["blue-back"]};
  padding: 2.5rem 0 6rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
`;

export const HeaderContentUpper = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  gap: 2rem;

  @media only screen and (min-width: 768px) {
    justify-content: space-between;
  }
`;

export const HeaderContentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0 0 0;
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

export const PrimaryButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme["blue-bright"]};
  color: ${(props) => props.theme["white"]};
  font-weight: bold;
  padding: 0 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["blue-bright-700"]};
    transition: background-color 0.2s;
  }
`;

export const MenuButtonContainer = styled.div`
  ul {
    gap: 1rem;
    display: flex;
    justify-content: space-around;
    list-style-type: none;
  }

  ul li {
    align-items: center;
    display: flex;
  }
`;

interface MenuItemProps {
  $active: boolean;
}

export const MenuItem = styled.li<MenuItemProps>`
  gap: 0.5rem;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;

  ${(props) =>
    props.$active &&
    css`
      background: ${(props) => props.theme["blue-bright"]};
    `}

  a {
    color: ${(props) => props.theme["white"]};
    text-decoration: none;
    padding: 0.9rem 0.9rem;

    &:hover {
      border-radius: 6px;
      background: ${(props) => props.theme["blue-bright-700"]};
      transition: background-color 0.2s;
    }
  }
`;
