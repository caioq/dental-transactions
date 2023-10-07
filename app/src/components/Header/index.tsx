import * as Dialog from "@radix-ui/react-dialog";
import { HeaderContainer, HeaderContent, HeaderLogo, NewProceduresButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import { ProcedureModal } from "../ProcedureModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderLogo>
          <img src={logoImg} />
          <h1>Aneliza Rodrigues</h1>
        </HeaderLogo>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewProceduresButton>Adicionar Procedimento</NewProceduresButton>
          </Dialog.Trigger>

          <ProcedureModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
