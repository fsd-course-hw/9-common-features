import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useForm } from "react-hook-form";
import { useSignIn } from "../model/use-sign-in";
import clsx from "clsx";

export function SignInForm({ className }: { className?: string }) {
  const { register, handleSubmit, formState } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn, isLoading, error } = useSignIn();

  const handleSubmitSignIn = handleSubmit((data) => {
    signIn(data);
  });

  return (
    <form
      className={clsx(className, "flex flex-col gap-4")}
      onSubmit={handleSubmitSignIn}
    >
      <UiTextField
        label="Email"
        inputProps={{
          ...register("email"),
          type: "email",
          placeholder: "example@ex.com",
        }}
        error={formState.errors.email?.message}
      />
      <UiTextField
        label="Пароль"
        inputProps={{
          ...register("password"),
          type: "password",
          placeholder: "****",
        }}
        error={formState.errors.password?.message}
      />
      <UiButton variant="primary" type="submit" isLoading={isLoading}>
        Войти
      </UiButton>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
