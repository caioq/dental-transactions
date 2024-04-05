import { UserCircle } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordFormInputs, changePasswordFormSchema } from "./types";
import { ChangePasswordContent, MyAccountContainer, MyAccountContent, MyAccountTitle, PrimaryButton } from "./styles";
import { useAuth } from "../../hooks";

export function MyAccount() {
  const { user, changePassword } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ChangePasswordFormInputs>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  async function handleSubmitChangePassword(data: ChangePasswordFormInputs) {
    try {
      await changePassword(data);
      alert("Senha alterada com sucesso");
      reset();
    } catch {
      alert("Erro ao alterar senha");
    }
  }

  return (
    <MyAccountContainer>
      <MyAccountTitle>
        <UserCircle size={28} />
        <span>Minha Conta</span>
      </MyAccountTitle>
      <MyAccountContent>
        <span>
          <b>Nome:</b> {user?.name}
        </span>
        <span>
          <b>E-mail:</b> {user?.email}
        </span>

        <ChangePasswordContent>
          <span>
            <b>Alterar Senha</b>
          </span>
          <form onSubmit={handleSubmit(handleSubmitChangePassword)}>
            <input type="password" placeholder="Senha Atual" {...register("currentPassword", { required: true })} />
            {errors.currentPassword?.message && <span>{errors.currentPassword.message}</span>}
            <input type="password" placeholder="Nova Senha" {...register("newPassword", { required: true })} />
            {errors.newPassword?.message && <span>{errors.newPassword.message}</span>}
            <input
              type="password"
              placeholder="Confirmar Nova Senha"
              {...register("confirmNewPassword", { required: true })}
            />
            {errors.confirmNewPassword?.message && <span>{errors.confirmNewPassword.message}</span>}
            <PrimaryButton type="submit" disabled={isSubmitting}>
              Salvar
            </PrimaryButton>
          </form>
        </ChangePasswordContent>
      </MyAccountContent>
    </MyAccountContainer>
  );
}
