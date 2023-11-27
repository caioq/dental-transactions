import { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  HeaderContainer,
  HeaderContent,
  HeaderLogo,
  NewProceduresButton,
  HeaderContentBottom,
  HeaderContentUpper,
  MenuButton,
  MenuButtonContainer,
} from "./styles";
import logoImg from "../../assets/logo.svg";
import { NewProcedureModal } from "../NewProcedureModal";
import { SelectDateInput } from "./components/SelectDateInput";
import { AuthContext } from "../../contexts/AuthContext";
import { ProceduresContext } from "../../contexts/ProceduresContext";
import { useViewport } from "../../hooks";

export function Header() {
  const { user } = useContext(AuthContext);
  const { fetchProcedures, fetchPayments } = useContext(ProceduresContext);
  const { isMobile } = useViewport();

  const [open, setOpen] = useState(false);
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
    }
  }, [fetchProcedures, fetchPayments, period]);

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderContentUpper>
          <HeaderLogo>
            <img src={logoImg} />
            <h1>{user?.name}</h1>
          </HeaderLogo>

          {!isMobile && (
            <MenuButtonContainer>
              <MenuButton>Procedimentos</MenuButton>
              <MenuButton>Custos</MenuButton>
            </MenuButtonContainer>
          )}
        </HeaderContentUpper>
        <HeaderContentBottom>
          <SelectDateInput startDate={user?.createdAt} value={period.startDate} onChange={handleChangeDate} />
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <NewProceduresButton>Adicionar Procedimento</NewProceduresButton>
            </Dialog.Trigger>

            <NewProcedureModal setOpenDialog={setOpen} />
          </Dialog.Root>
        </HeaderContentBottom>
      </HeaderContent>
    </HeaderContainer>
  );
}
