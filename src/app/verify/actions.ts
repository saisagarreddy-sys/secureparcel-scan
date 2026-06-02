"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export type VerifyParcelState = {
  error?: string;
  result?: "valid" | "invalid";
};

function normalizeCode(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replaceAll("-", "").toUpperCase();
}

export async function verifyParcel(
  _previousState: VerifyParcelState,
  formData: FormData,
): Promise<VerifyParcelState> {
  const enteredCode = normalizeCode(formData.get("verification_code"));

  if (!enteredCode) {
    return { error: "Enter the handwritten parcel code." };
  }

  const supabase = createAdminClient();
  const { data: parcel, error: lookupError } = await supabase
    .from("parcels")
    .select("id")
    .eq("verification_code", enteredCode)
    .maybeSingle();

  if (lookupError) {
    return { error: "Could not verify the code. Try again." };
  }

  const isValid = Boolean(parcel);
  const { error: logError } = await supabase
    .from("verification_attempts")
    .insert({
      entered_code: enteredCode,
      parcel_id: parcel?.id ?? null,
      is_valid: isValid,
    });

  if (logError) {
    return { error: "Could not verify the code. Try again." };
  }

  return { result: isValid ? "valid" : "invalid" };
}
