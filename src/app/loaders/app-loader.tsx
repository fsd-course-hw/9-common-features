import { useSession } from "@/entities/session";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ReactNode, useEffect, useState } from "react";
import { useApplayAppInterceptor } from "../app-interceptor";

export function AppLoader({ children }: { children?: ReactNode }) {
  const loadSession = useSession((s) => s.loadSession);
  const [isLoading, setIsLoading] = useState(true);

  useApplayAppInterceptor();

  useEffect(() => {
    setIsLoading(true);

    Promise.all([loadSession()])
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => {});
  }, [loadSession]);

  return (
    <>
      <UiPageSpinner isLoading={isLoading} />
      {isLoading ? null : children}
    </>
  );
}
