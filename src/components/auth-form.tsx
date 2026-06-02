"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { AuthActionState } from "@/app/auth/actions";

type AuthAction = (
  previousState: AuthActionState,
  formData: FormData,
) => Promise<AuthActionState>;

function SubmitButton({
  idleLabel,
  pendingLabel,
}: {
  idleLabel: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:bg-emerald-600"
    >
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}

export function AuthForm({
  action,
  submitLabel,
  pendingLabel,
  passwordPlaceholder,
  passwordAutoComplete,
}: {
  action: AuthAction;
  submitLabel: string;
  pendingLabel: string;
  passwordPlaceholder: string;
  passwordAutoComplete: "current-password" | "new-password";
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <label className="block text-sm font-bold text-slate-700">
        Email address
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none placeholder:text-slate-400 focus:border-emerald-600"
        />
      </label>
      <label className="block text-sm font-bold text-slate-700">
        Password
        <input
          name="password"
          type="password"
          autoComplete={passwordAutoComplete}
          minLength={6}
          required
          placeholder={passwordPlaceholder}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none placeholder:text-slate-400 focus:border-emerald-600"
        />
      </label>
      {state.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-700"
        >
          {state.error}
        </p>
      ) : null}
      <SubmitButton idleLabel={submitLabel} pendingLabel={pendingLabel} />
    </form>
  );
}
