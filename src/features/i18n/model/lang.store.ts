import { create } from "zustand";

export type Lang = "ru" | "en";

type LangStore = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const useLang = create<LangStore>((set) => ({
  lang: (localStorage.getItem("lang") as Lang) || "ru",
  setLang: (lang) => {
    localStorage.setItem("lang", lang);

    set({ lang });
  },
}));
