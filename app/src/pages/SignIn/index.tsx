import { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";
import { HeaderLogo, PrimaryButton, SignInContainer, SignInContent } from "./styles";
import { LogoIcon } from "../../assets/icons/Logo";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { SignInFormInputs } from "./types";

export function SignIn() {
  const theme = useContext(ThemeContext);
  const { signIn, signed } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<SignInFormInputs>({});
  const navigate = useNavigate();

  async function handleSubmitSignIn(data: SignInFormInputs) {
    const { email, password } = data;

    await signIn({
      email,
      password,
    });
    navigate("/procedures");
  }

  useEffect(() => {
    if (signed) {
      navigate("/procedures");
    }
  }, [signed, navigate]);

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
          <PrimaryButton type="submit">Entrar</PrimaryButton>
        </form>
      </SignInContent>
    </SignInContainer>
  );
}
