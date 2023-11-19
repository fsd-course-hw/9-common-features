import { useBoards } from "@/entities/board";
import { useSession } from "@/entities/session";
import { useTasks } from "@/entities/task";
import { useUsers } from "@/entities/user";
import { ROUTER_PATHS } from "@/shared/constants";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function PrivateLoader({ children }: { children?: React.ReactNode }) {
  const session = useSession((s) => s.currentSession);

  const loadUsers = useUsers((u) => u.loadUsers);
  const loadBoards = useBoards((b) => b.loadBoards);
  const loadTasks = useTasks((t) => t.loadTasks);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    if (!session) {
      navigate(ROUTER_PATHS.SIGN_IN);
      return;
    }

    Promise.all([loadUsers(), loadBoards(), loadTasks()]).finally(() => {
      setIsLoading(false);
    });
  }, [session, loadUsers, loadBoards, loadTasks, navigate]);

  return (
    <>
      <UiPageSpinner isLoading={isLoading} />
      {isLoading ? null : children}
    </>
  );
}
