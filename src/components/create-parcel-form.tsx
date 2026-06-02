"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  createParcel,
  type CreateParcelState,
} from "@/app/dashboard/actions";

function CreateParcelButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:bg-emerald-600"
    >
      {pending ? "Creating parcel..." : "Create parcel"}
    </button>
  );
}

export function CreateParcelForm() {
  const [state, formAction] = useActionState<CreateParcelState, FormData>(
    createParcel,
    {},
  );

  return (
    <form action={formAction} className="space-y-3">
      <label className="block text-sm font-bold text-slate-700">
        Order reference{" "}
        <span className="font-normal text-slate-400">(optional)</span>
        <input
          name="order_reference"
          type="text"
          maxLength={100}
          placeholder="For example: ORDER-1042"
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
      {state.success ? (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm leading-5 text-emerald-800"
        >
          {state.success}
        </p>
      ) : null}
      <CreateParcelButton />
    </form>
  );
}
