import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HeaderLogo, PrimaryButton, SignInContainer, SignInContent } from "./styles";
import { LogoIcon } from "../../assets/icons/Logo";
import { AuthContext } from "../../contexts/AuthContext";
import { SignInFormInputs } from "./types";
import { RoutesPath } from "../../routes/router";

export function SignIn() {
  const theme = useContext(ThemeContext);
  const { signIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormInputs>({});
  const navigate = useNavigate();

  async function handleSubmitSignIn(data: SignInFormInputs) {
    const { email, password } = data;

    try {
      await signIn({
        email,
        password,
      });
      navigate(RoutesPath.PROCEDURES);
    } catch (error) {
      alert("Erro ao realizar login");
    }
  }

  return (
    <SignInContainer>
      <SignInContent>
        <HeaderLogo>
          <LogoIcon fill={theme?.["blue-dark"]} />
          <h1>Dental Transactions</h1>
        </HeaderLogo>

        <form onSubmit={handleSubmit(handleSubmitSignIn)}>
          <input type="text" placeholder="email" required {...register("email")} />
          <input type="password" placeholder="password" required {...register("password")} />
          <PrimaryButton type="submit" disabled={isSubmitting}>
            Entrar
          </PrimaryButton>
        </form>
      </SignInContent>
    </SignInContainer>
  );
}
