import { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  HeaderContainer,
  HeaderContent,
  HeaderLogo,
  NewProceduresButton,
  HeaderContentBottom,
  HeaderContentUpper,
} from "./styles";
import logoImg from "../../assets/logo.svg";
import { NewProcedureModal } from "../NewProcedureModal";
import { SelectDateInput } from "./components/SelectDateInput";
import { AuthContext } from "../../contexts/AuthContext";
import { getDateFromMonthYear, getMonthYearStringFromDate } from "../../utils";
import { ProceduresContext } from "../../contexts/ProceduresContext";

export function Header() {
  const { user } = useContext(AuthContext);
  const { fetchProcedures, fetchPayments } = useContext(ProceduresContext);

  const [open, setOpen] = useState(false);
  const [monthYear, setMonthYear] = useState<string>(() => {
    const currentDateString = getMonthYearStringFromDate(new Date());
    return `${currentDateString.month} ${currentDateString.year}`;
  });

  function handleMonthYear(dateString: string) {
    setMonthYear(dateString);
  }

  useEffect(() => {
    if (monthYear) {
      const date = getDateFromMonthYear(monthYear);
      fetchProcedures(date);
      fetchPayments(date);
    }
  }, [fetchProcedures, fetchPayments, monthYear]);

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderContentUpper>
          <HeaderLogo>
            <img src={logoImg} />
            <h1>{user?.name}</h1>
          </HeaderLogo>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <NewProceduresButton>Adicionar Procedimento</NewProceduresButton>
            </Dialog.Trigger>

            <NewProcedureModal setOpenDialog={setOpen} />
          </Dialog.Root>
        </HeaderContentUpper>
        <HeaderContentBottom>
          <SelectDateInput startDate={user?.createdAt} value={monthYear} onChange={handleMonthYear} />
        </HeaderContentBottom>
      </HeaderContent>
    </HeaderContainer>
  );
}
