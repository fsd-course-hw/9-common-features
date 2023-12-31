import { useSession } from "@/entities/session";
import { api } from "@/shared/api";
import { ROUTER_PATHS } from "@/shared/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n";
import { useToasts } from "@/shared/lib/toasts";

export function useSignIn() {
  const { t } = useI18n();
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const setCurrentSession = useSession((s) => {
    return s.setCurrentSession;
  });

  const signIn = (signInDto: api.SignInDto) => {
    setIsLoading(true);
    api
      .signIn(signInDto)
      .then((session) => {
        setCurrentSession(session);
        addToast({
          message: t("sign-in-success"),
          type: "success",
        });
        navigate(ROUTER_PATHS.BOARDS);
        return session;
      })
      .catch(() => {
        setError(t("sign-in-error"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    error,
    signIn,
  };
}
