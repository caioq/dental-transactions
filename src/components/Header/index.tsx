import { HeaderContainer, HeaderContent, HeaderLogo, NewProceduresButton } from "./styles";
import logoImg from "../../assets/logo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderLogo>
          <img src={logoImg} />
          <h1>Aneliza Rodrigues</h1>
        </HeaderLogo>
        <NewProceduresButton>Adicionar Procedimento</NewProceduresButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
