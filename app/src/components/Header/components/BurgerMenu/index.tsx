import { useState } from "react";
import { Burger } from "./components/Burger";
import { Menu } from "./components/Menu";
import { StyledBurgerMenu } from "./styles";

export function BurgerMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <StyledBurgerMenu>
      <Burger open={openMenu} setOpen={setOpenMenu} />
      <Menu open={openMenu} />
    </StyledBurgerMenu>
  );
}
