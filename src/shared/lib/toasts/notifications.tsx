import { useState } from "react";
import { createStrictContext, useStrictContext } from "./react";

type NotificationParams = {
  type: "success" | "error";
  message: string;
  lifeTime?: number;
};

type NotificationsContext = {
  addNotification: (params: NotificationParams) => void;
};

const context = createStrictContext<NotificationsContext>();

export function useNotifications() {
  return useStrictContext(context);
}

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<NotificationParams[]>([]);

  const addNotification = (params: NotificationParams) => {};

  return (
    <context.Provider value={{ addNotification }}>{children}</context.Provider>
  );
}

export function NotificationsContainer() {
  return useStrictContext(context);
}
