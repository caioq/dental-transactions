import * as Dialog from "@radix-ui/react-dialog";
import { HeaderContainer, HeaderContent, HeaderLogo, NewProceduresButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import { NewProcedureModal } from "../NewProcedureModal";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderLogo>
          <img src={logoImg} />
          <h1>Aneliza Rodrigues</h1>
        </HeaderLogo>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <NewProceduresButton>Adicionar Procedimento</NewProceduresButton>
          </Dialog.Trigger>

          <NewProcedureModal setOpenDialog={setOpen} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
