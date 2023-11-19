import { UiHeader } from "@/shared/ui/ui-header";
import { Outlet } from "react-router-dom";

export function OpenLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <UiHeader />
      <main className="grow flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
