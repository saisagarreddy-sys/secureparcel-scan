import { PageShell } from "@/components/page-shell";
import { VerifyParcelForm } from "@/components/verify-parcel-form";

export default function VerifyPage() {
  return (
    <PageShell
      eyebrow="Public verification"
      title="Verify your parcel"
      description="Enter the 8-character code handwritten on your package. The result will appear here."
    >
      <VerifyParcelForm />
      <p className="mt-5 text-center text-xs leading-5 text-slate-500">
        Codes are checked manually. This page does not use camera scanning or
        QR codes.
      </p>
    </PageShell>
  );
}
