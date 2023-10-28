import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { HeaderLogo, PrimaryButton, SignInContainer, SignInContent } from "./styles";
import { LogoIcon } from "../../assets/icons/Logo";

export function SignIn() {
  const theme = useContext(ThemeContext);

  return (
    <SignInContainer>
      <SignInContent>
        <HeaderLogo>
          <LogoIcon fill={theme?.["blue-dark"]} />
          <h1>Dental Transactions</h1>
        </HeaderLogo>

        <form>
          <input type="text" placeholder="email" />
          <input type="password" placeholder="password" />
          <PrimaryButton type="submit">Entrar</PrimaryButton>
        </form>
      </SignInContent>
    </SignInContainer>
  );
}
