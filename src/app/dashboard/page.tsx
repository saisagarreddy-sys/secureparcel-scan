import { redirect } from "next/navigation";
import { logout } from "@/app/auth/actions";
import { CreateParcelForm } from "@/components/create-parcel-form";
import { PageShell } from "@/components/page-shell";
import { createClient } from "@/lib/supabase/server";

function formatVerificationCode(code: string) {
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: parcels, error } = await supabase
    .from("parcels")
    .select("id, order_reference, verification_code, created_at")
    .order("created_at", { ascending: false });

  return (
    <PageShell
      eyebrow="Seller dashboard"
      title="Your parcels"
      description="Create parcel codes and keep a simple record of the parcels you have prepared."
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <p className="truncate text-xs text-slate-500">{user.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="shrink-0 text-xs font-bold text-emerald-700"
            >
              Log out
            </button>
          </form>
        </div>
        <CreateParcelForm />
        {error ? (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-700">
            Could not load your parcels. Refresh the page to try again.
          </p>
        ) : null}
        {!error && parcels.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-8 text-center">
            <p className="text-sm font-bold text-slate-700">No parcels yet</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your generated parcel codes will appear here.
            </p>
          </div>
        ) : null}
        {!error && parcels.length > 0 ? (
          <div className="mt-6 space-y-3">
            {parcels.map((parcel) => (
              <article
                key={parcel.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <p className="font-mono text-xl font-black tracking-[0.13em] text-emerald-900">
                  {formatVerificationCode(parcel.verification_code)}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                  <p className="truncate">
                    {parcel.order_reference || "No order reference"}
                  </p>
                  <time className="shrink-0">
                    {new Date(parcel.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </PageShell>
  );
}
