import Link from "next/link";
import { login } from "@/app/auth/actions";
import { AuthForm } from "@/components/auth-form";
import { PageShell } from "@/components/page-shell";

export default function LoginPage() {
  return (
    <PageShell
      eyebrow="Seller access"
      title="Welcome back"
      description="Log in to create and view your parcel verification codes."
    >
      <AuthForm
        action={login}
        submitLabel="Log in"
        pendingLabel="Logging in..."
        passwordPlaceholder="Enter your password"
        passwordAutoComplete="current-password"
      />
      <p className="mt-5 text-center text-sm text-slate-600">
        New seller?{" "}
        <Link href="/signup" className="font-bold text-emerald-700">
          Create an account
        </Link>
      </p>
    </PageShell>
  );
}
