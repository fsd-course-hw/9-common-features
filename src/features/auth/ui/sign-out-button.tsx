import { UiButton } from "@/shared/ui/ui-button";
import { useSignOut } from "../model/use-sign-out";

export function SignOutButton({ className }: { className?: string }) {
  const { signOut, isLoading } = useSignOut();
  return (
    <UiButton
      isLoading={isLoading}
      className={className}
      variant="outlined"
      onClick={() => signOut()}
    >
      Выйти
    </UiButton>
  );
}
