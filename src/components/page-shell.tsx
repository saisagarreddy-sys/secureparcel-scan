import type { ReactNode } from "react";
import { Brand } from "@/components/brand";

export function PageShell({
  children,
  eyebrow,
  title,
  description,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-5 py-6">
      <div className="mx-auto max-w-md">
        <Brand />
        <section className="pt-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          <div className="mt-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
