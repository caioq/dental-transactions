import * as Dialog from "@radix-ui/react-dialog";
import { HeaderContainer, HeaderContent, HeaderLogo, NewProceduresButton } from "./styles";
import logoImg from "../../assets/logo.svg";
import { NewProcedureModal } from "../NewProcedureModal";

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

          <NewProcedureModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
