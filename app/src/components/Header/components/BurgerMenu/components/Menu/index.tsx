import { Link, useMatch } from "react-router-dom";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { StyledMenu, MenuItem } from "./styles";

interface MenuProps {
  open: boolean;
}

export function Menu({ open }: MenuProps) {
  const matchRoute = useMatch("/:route");

  function isMatchRoute(route: string) {
    return matchRoute?.params.route === route;
  }

  return (
    <StyledMenu open={open}>
      <Link to="/procedures">
        <MenuItem active={isMatchRoute("procedures")}>
          <ArrowCircleUp size={32} />
          Procedimentos
        </MenuItem>
      </Link>
      <Link to="/costs">
        <MenuItem active={isMatchRoute("costs")}>
          <ArrowCircleDown size={32} />
          Custos
        </MenuItem>
      </Link>
      <Link to="/" className="signout">
        Sair
      </Link>
    </StyledMenu>
  );
}
