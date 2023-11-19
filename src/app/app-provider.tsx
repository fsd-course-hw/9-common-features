import { useLang } from "@/features/i18n";
import { I18nProvider } from "@/shared/lib/i18n";
import { ComposeChildren } from "@/shared/lib/react";
import { Confirmations } from "@/widgets/confirmations";

export function AppProvider({ children }: { children?: React.ReactNode }) {
  const { lang } = useLang();
  return (
    <ComposeChildren>
      <Confirmations />
      <I18nProvider lang={lang} />
      {children}
    </ComposeChildren>
  );
}
