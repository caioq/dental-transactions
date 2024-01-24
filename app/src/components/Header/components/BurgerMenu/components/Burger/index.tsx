import { StyledBurger } from "./styles";

interface BurgerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Burger({ open, setOpen }: BurgerProps) {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
}
