import { Link, useMatch } from "react-router-dom";
import { ArrowCircleDown, ArrowCircleUp, ChartLine, UserCircle } from "phosphor-react";
import { StyledMenu, MenuItem } from "./styles";
import { useAuth } from "../../../../../../hooks";
import { RoutesPath } from "../../../../../../routes/router";

interface MenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Menu({ open, setOpen }: MenuProps) {
  const { signOut } = useAuth();
  const matchRoute = useMatch("/dashboard/:route");

  function isMatchRoute(route: string) {
    return matchRoute?.params.route === route;
  }

  return (
    <StyledMenu open={open}>
      <Link to={RoutesPath.PROCEDURES} onClick={() => setOpen(!open)}>
        <MenuItem active={isMatchRoute("procedures")}>
          <ArrowCircleDown size={32} />
          Procedimentos
        </MenuItem>
      </Link>
      <Link to={RoutesPath.COSTS} onClick={() => setOpen(!open)}>
        <MenuItem active={isMatchRoute("costs")}>
          <ArrowCircleUp size={32} />
          Custos
        </MenuItem>
      </Link>
      <Link to={RoutesPath.DASHBOARD} onClick={() => setOpen(!open)}>
        <MenuItem active={isMatchRoute("analytics")}>
          <ChartLine size={32} />
          Dashboard
        </MenuItem>
      </Link>
      <Link to={RoutesPath.MY_ACCOUNT} onClick={() => setOpen(!open)}>
        <MenuItem active={isMatchRoute("account")}>
          <UserCircle size={32} />
          Minha Conta
        </MenuItem>
      </Link>
      <Link to="/" className="signout" onClick={signOut}>
        Sair
      </Link>
    </StyledMenu>
  );
}
