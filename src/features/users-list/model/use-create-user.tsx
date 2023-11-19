import { CreateUserData, useUsers } from "@/entities/user";
import { useState } from "react";

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const createUserRaw = useUsers((s) => s.createUser);

  const createUser = async (data: CreateUserData) => {
    setIsLoading(true);
    await createUserRaw?.(data).finally(() => {
      setIsLoading(false);
    });
  };

  return {
    isLoading,
    createUser,
  };
}
