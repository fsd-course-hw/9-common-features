import { UsersPage } from "@/pages/users";
import { createBrowserRouter, redirect } from "react-router-dom";
import { ROUTER_PATHS } from "@/shared/constants";
import { BoardsPage } from "@/pages/boards";
import { BoardPage } from "@/pages/board";
import { SignInPage } from "@/pages/sign-in";
import { PrivateLayout } from "./layouts/private-layout";
import { OpenLayout } from "./layouts/open-layout";
import { PrivateLoader } from "./loaders/private-loader";
import { AppLoader } from "./loaders/app-loader";
import { AppLayout } from "./layouts/app-layout";
import { ForbiddenPage } from "@/pages/403";
import { AppProvider } from "./providers/app-provider";
import { PrivateProvider } from "./providers/private-provider";

export const router = createBrowserRouter([
  {
    element: (
      <AppLoader>
        <AppProvider>
          <AppLayout />
        </AppProvider>
      </AppLoader>
    ),
    children: [
      {
        element: (
          <PrivateLoader>
            <PrivateProvider>
              <PrivateLayout />
            </PrivateProvider>
          </PrivateLoader>
        ),
        children: [
          {
            path: ROUTER_PATHS.BOARD,
            element: <BoardPage />,
          },
          {
            path: ROUTER_PATHS.BOARDS,
            element: <BoardsPage />,
          },
          {
            path: ROUTER_PATHS.USERS,
            element: <UsersPage />,
          },
        ],
      },
      {
        element: <OpenLayout />,
        children: [
          {
            path: ROUTER_PATHS.SIGN_IN,
            element: <SignInPage />,
          },
        ],
      },
    ],
  },
  { path: ROUTER_PATHS[403], element: <ForbiddenPage /> },
  {
    path: "*",
    loader: () => redirect(ROUTER_PATHS.BOARDS),
  },
]);
