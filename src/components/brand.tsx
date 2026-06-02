import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-700 text-sm font-black tracking-tight text-white shadow-sm">
        SP
      </span>
      <span className="text-base font-bold tracking-tight text-slate-900">
        SecureParcel
      </span>
    </Link>
  );
}
