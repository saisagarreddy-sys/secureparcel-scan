import Link from "next/link";
import { signup } from "@/app/auth/actions";
import { AuthForm } from "@/components/auth-form";
import { PageShell } from "@/components/page-shell";

export default function SignupPage() {
  return (
    <PageShell
      eyebrow="Seller signup"
      title="Create your account"
      description="Start generating simple handwritten verification codes for your parcels."
    >
      <AuthForm
        action={signup}
        submitLabel="Create account"
        pendingLabel="Creating account..."
        passwordPlaceholder="Choose a password"
        passwordAutoComplete="new-password"
      />
      <p className="mt-5 text-center text-sm text-slate-600">
        Already registered?{" "}
        <Link href="/login" className="font-bold text-emerald-700">
          Log in
        </Link>
      </p>
    </PageShell>
  );
}
