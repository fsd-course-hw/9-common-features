// Sign in page component

import { SignInForm } from "@/features/auth";

export function SignInPage() {
  return (
    <main className="grow flex flex-col pt-24 ">
      <div className="rounded-xl border border-slate-300 px-14 py-8 pb-14 w-full max-w-[400px] bg-white self-center shadow-lg">
        <h1 className="text-2xl mb-6">Вход</h1>
        <SignInForm />
      </div>
    </main>
  );
}
