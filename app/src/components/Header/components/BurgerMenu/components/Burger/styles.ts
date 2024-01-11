import styled from "styled-components";

interface StyledBurgerProps {
  open: boolean;
}

export const StyledBurger = styled.button<StyledBurgerProps>`
  display: none;

  width: 1.5rem;
  height: 1.5rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 10;

  border: none;
  cursor: pointer;
  background: transparent;

  &:focus {
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme["mobile-width"]}) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 1.5rem;
    height: 0.25rem;
    background-color: ${({ open, theme }) => (open ? theme.white : theme.white)};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    position: relative;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
