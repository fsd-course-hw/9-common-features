import { useTheme } from "@/features/theme";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const { theme } = useTheme();
  return (
    <div className={clsx(theme)}>
      <div className="text-slate-900 dark:text-white">
        <Outlet />
      </div>
    </div>
  );
}
