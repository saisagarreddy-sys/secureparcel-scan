import Link from "next/link";
import { Brand } from "@/components/brand";

const steps = [
  "Create a parcel code",
  "Write it on the package",
  "Let anyone verify it online",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f5]">
      <div className="mx-auto max-w-5xl px-5 pb-10 pt-6 sm:px-8">
        <header className="flex items-center justify-between">
          <Brand />
          <Link
            href="/login"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400"
          >
            Seller login
          </Link>
        </header>

        <section className="grid gap-10 pb-16 pt-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:pt-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              Parcel trust, made simple
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-black leading-[1.06] tracking-tight text-slate-950 sm:text-6xl">
              A handwritten code for every parcel.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Give customers a quick way to check that a parcel really came
              from you. No QR code, no scanning, no complicated setup.
            </p>

            <div className="mt-8 grid gap-3 sm:flex">
              <Link
                href="/signup"
                className="rounded-2xl bg-emerald-700 px-5 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800"
              >
                Start as a seller
              </Link>
              <Link
                href="/verify"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-center text-sm font-bold text-slate-800 shadow-sm transition hover:border-slate-400"
              >
                Verify a parcel
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-7 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="relative rounded-[2rem] border border-emerald-900/10 bg-white p-5 shadow-xl shadow-emerald-900/10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Parcel verification code
              </p>
              <div className="mt-7 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 px-4 py-6 text-center">
                <p className="font-mono text-3xl font-black tracking-[0.16em] text-emerald-900">
                  7KRM-P4WX
                </p>
              </div>
              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Short, clear, and easy to write by hand on a package.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-slate-900 px-6 py-8 text-white sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            How it works
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-3 sm:block">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-black text-slate-950">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm font-bold leading-6 sm:mt-3 sm:pt-0">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-6 text-center text-xs leading-5 text-slate-500">
          Built for small e-commerce sellers who need a simple first layer of
          parcel verification.
        </footer>
      </div>
    </main>
  );
}
