import { Link, useMatch } from "react-router-dom";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { StyledMenu, MenuItem } from "./styles";
import { useAuth } from "../../../../../../hooks";
import { RoutesPath } from "../../../../../../routes/router";

interface MenuProps {
  open: boolean;
}

export function Menu({ open }: MenuProps) {
  const { signOut } = useAuth();
  const matchRoute = useMatch("/dashboard/:route");

  function isMatchRoute(route: string) {
    return matchRoute?.params.route === route;
  }

  return (
    <StyledMenu open={open}>
      <Link to={RoutesPath.PROCEDURES}>
        <MenuItem active={isMatchRoute("procedures")}>
          <ArrowCircleUp size={32} />
          Procedimentos
        </MenuItem>
      </Link>
      <Link to={RoutesPath.COSTS}>
        <MenuItem active={isMatchRoute("costs")}>
          <ArrowCircleDown size={32} />
          Custos
        </MenuItem>
      </Link>
      <Link to="/" className="signout" onClick={signOut}>
        Sair
      </Link>
    </StyledMenu>
  );
}
