import styled from "styled-components";

export const StyledBurgerMenu = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme["mobile-width"]}) {
    display: flex;
    z-index: 100;
  }
`;
