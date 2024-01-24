import { useContext, useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import {
  HeaderContainer,
  HeaderContent,
  HeaderLogo,
  HeaderContentBottom,
  HeaderContentUpper,
  MenuButtonContainer,
  MenuItem,
  PrimaryButton,
} from "./styles";
import { SelectDateInput } from "./components/SelectDateInput";
import { BurgerMenu } from "./components/BurgerMenu";
import { NewProcedureModal } from "../NewProcedureModal";
import { AuthContext } from "../../contexts/AuthContext";
import { ProceduresContext } from "../../contexts/ProceduresContext";
import { useViewport } from "../../hooks";
import logoImg from "../../assets/logo.svg";
import { NewCostModal } from "../NewCostModal";

function isMatchRoute(compareRoute: string, currentRoute?: string) {
  return currentRoute === compareRoute;
}

export function Header() {
  const { user } = useContext(AuthContext);
  const { fetchProcedures, fetchPayments, fetchCosts } = useContext(ProceduresContext);

  const { isMobile } = useViewport();
  const matchRoute = useMatch("/:route");

  const [period, setPeriod] = useState<{ startDate: Date; endDate: Date }>(() => {
    const today = new Date();
    return {
      startDate: new Date(today.getFullYear(), today.getMonth(), 1),
      endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    };
  });

  function handleChangeDate(date: Date) {
    setPeriod({
      startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    });
  }

  useEffect(() => {
    if (period) {
      fetchProcedures(period.startDate, period.endDate);
      fetchPayments(period.startDate, period.endDate);
      fetchCosts(period.startDate, period.endDate);
    }
  }, [fetchProcedures, fetchPayments, fetchCosts, period]);

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderContentUpper>
          <HeaderLogo>
            <img src={logoImg} />
            <h1>{user?.name}</h1>
          </HeaderLogo>

          {isMobile ? (
            <BurgerMenu />
          ) : (
            <MenuButtonContainer>
              <ul>
                <MenuItem $active={isMatchRoute("procedures", matchRoute?.params.route)}>
                  <Link to="/procedures">Procedimentos</Link>
                </MenuItem>
                <MenuItem $active={isMatchRoute("costs", matchRoute?.params.route)}>
                  <Link to="/costs">Custos</Link>
                </MenuItem>
              </ul>
            </MenuButtonContainer>
          )}
        </HeaderContentUpper>
        <HeaderContentBottom>
          <SelectDateInput startDate={user?.createdAt} value={period.startDate} onChange={handleChangeDate} />
          {isMobile && <ActionButton route={matchRoute?.params.route} />}
        </HeaderContentBottom>
      </HeaderContent>
    </HeaderContainer>
  );
}

function ActionButton({ route }: { route?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {isMatchRoute("procedures", route) && (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <PrimaryButton>+ Procedimento</PrimaryButton>
          </Dialog.Trigger>

          <NewProcedureModal setOpenDialog={setOpen} />
        </Dialog.Root>
      )}
      {isMatchRoute("costs", route) && (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <PrimaryButton>+ Custo</PrimaryButton>
          </Dialog.Trigger>

          <NewCostModal setOpenDialog={setOpen} />
        </Dialog.Root>
      )}
    </>
  );
}
