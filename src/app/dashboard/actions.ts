"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ2346789";
const CODE_LENGTH = 8;
const MAX_CODE_ATTEMPTS = 5;

export type CreateParcelState = {
  error?: string;
  success?: string;
};

function generateVerificationCode() {
  const characters: string[] = [];
  const acceptanceLimit =
    256 - (256 % CODE_ALPHABET.length);

  while (characters.length < CODE_LENGTH) {
    for (const byte of randomBytes(CODE_LENGTH)) {
      if (byte < acceptanceLimit) {
        characters.push(CODE_ALPHABET[byte % CODE_ALPHABET.length]);
      }

      if (characters.length === CODE_LENGTH) {
        break;
      }
    }
  }

  return characters.join("");
}

export async function createParcel(
  _previousState: CreateParcelState,
  formData: FormData,
): Promise<CreateParcelState> {
  const orderReference = formData.get("order_reference");

  if (typeof orderReference !== "string") {
    return { error: "Enter a valid order reference or leave it blank." };
  }

  const normalizedOrderReference = orderReference.trim() || null;

  if (normalizedOrderReference && normalizedOrderReference.length > 100) {
    return { error: "Keep the order reference under 100 characters." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your session expired. Log in and try again." };
  }

  const admin = createAdminClient();

  for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt += 1) {
    const verificationCode = generateVerificationCode();
    const { data: existingParcel, error: lookupError } = await admin
      .from("parcels")
      .select("id")
      .eq("verification_code", verificationCode)
      .maybeSingle();

    if (lookupError) {
      return { error: "Could not create the parcel. Try again." };
    }

    if (existingParcel) {
      continue;
    }

    const { error: insertError } = await supabase.from("parcels").insert({
      seller_id: user.id,
      order_reference: normalizedOrderReference,
      verification_code: verificationCode,
    });

    if (!insertError) {
      revalidatePath("/dashboard");
      return { success: "Parcel created. Write the code on your package." };
    }

    if (insertError.code !== "23505") {
      return { error: "Could not create the parcel. Try again." };
    }
  }

  return { error: "Could not generate a unique parcel code. Try again." };
}
