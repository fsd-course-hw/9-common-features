import { useSession } from "@/entities/session";
import { api } from "@/shared/api";
import { ROUTER_PATHS } from "@/shared/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
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
        navigate(ROUTER_PATHS.BOARDS);
        return session;
      })
      .catch(() => {
        setError("Не верный логин или пароль");
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
