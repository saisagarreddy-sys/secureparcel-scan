"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  verifyParcel,
  type VerifyParcelState,
} from "@/app/verify/actions";

function VerifyButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:bg-emerald-600"
    >
      {pending ? "Checking code..." : "Check parcel code"}
    </button>
  );
}

export function VerifyParcelForm() {
  const [state, formAction] = useActionState<VerifyParcelState, FormData>(
    verifyParcel,
    {},
  );

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <label className="block text-sm font-bold text-slate-700">
        Parcel code
        <input
          name="verification_code"
          type="text"
          inputMode="text"
          maxLength={9}
          autoCapitalize="characters"
          autoComplete="off"
          placeholder="XXXX-XXXX"
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-4 text-center font-mono text-xl font-black uppercase tracking-[0.16em] outline-none placeholder:text-slate-300 focus:border-emerald-600"
        />
      </label>
      {state.error ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-700"
        >
          {state.error}
        </p>
      ) : null}
      {state.result === "valid" ? (
        <p
          role="status"
          className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-center text-sm font-bold leading-5 text-emerald-800"
        >
          Valid parcel code
        </p>
      ) : null}
      {state.result === "invalid" ? (
        <p
          role="status"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-center text-sm font-bold leading-5 text-red-700"
        >
          Invalid parcel code
        </p>
      ) : null}
      <VerifyButton />
    </form>
  );
}
