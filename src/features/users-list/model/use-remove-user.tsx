import { useUsers } from "@/entities/user";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useState } from "react";

export function useRemoveUser() {
  const [isLoading, setIsLoading] = useState(false);
  const getConfirmation = useGetConfirmation();
  const removeUser = useUsers((s) => s.removeUser);

  const remove = async (userId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить пользователя?",
    });

    if (!confirmation) return;

    setIsLoading(true);

    try {
      await removeUser(userId);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    remove,
  };
}
