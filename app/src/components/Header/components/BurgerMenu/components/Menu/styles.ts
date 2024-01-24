import styled, { css } from "styled-components";

interface StyledMenuProps {
  open: boolean;
}

export const StyledMenu = styled.nav<StyledMenuProps>`
  display: none;

  a {
    padding: 18px 50px;
    color: #fff;
    text-decoration: none;
    font-size: 24px;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: left;
    width: 100%;
  }

  a:hover {
    color: ${({ theme }) => theme["blue-bright"]};
  }

  a:first-child {
    border-top: 1px solid #bfd8e7;
  }

  .signout {
    border-top: 1px solid #bfd8e7;
  }

  @media (max-width: ${({ theme }) => theme["mobile-width"]}) {
    flex-flow: column wrap;
    background-color: ${({ theme }) => theme["blue-back"]};
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    list-style: none;
    display: flex;
    width: 100%;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    align-items: center;
  }
`;

export const MenuItem = styled.div<{ active: boolean }>`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;

  ${(props) =>
    props.active &&
    css`
      color: ${(props) => props.theme["blue-bright"]};
    `}
`;
