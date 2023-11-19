import { create } from "zustand";
import { Session } from "./types";
import { api } from "@/shared/api";

type SessionStore = {
  isLoading: boolean;
  currentSession?: Session;
  loadSession: () => Promise<Session>;
  setCurrentSession: (session: Session) => void;
  removeSession: () => void;
};

export const useSession = create<SessionStore>((set) => ({
  isLoading: false,
  currentSession: undefined,
  loadSession: async () => {
    set({ isLoading: true });
    const session = await api.getSession();
    set({ currentSession: session, isLoading: false });
    return session;
  },
  setCurrentSession: (session) => {
    set({ currentSession: session });
  },
  removeSession: () => {
    set({ currentSession: undefined });
  },
}));
