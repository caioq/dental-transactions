import { useContext, useState } from "react";
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

export function Header() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

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
          <SelectDateInput date={user?.createdAt} />
        </HeaderContentBottom>
      </HeaderContent>
    </HeaderContainer>
  );
}
