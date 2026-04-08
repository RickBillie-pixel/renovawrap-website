import { supabase } from "./supabase";

/**
 * Stuurt een e-mailnotificatie naar info@renovawrap.nl via de notify-admin Edge Function.
 * Fire-and-forget: blokkeert de UI niet en gooit geen errors.
 */
export function sendNotificationEmail(
  type: "keuzehulp" | "contact" | "configurator",
  data: Record<string, unknown>
): void {
  supabase.functions
    .invoke("notify-admin", {
      body: { source: type, ...data },
    })
    .catch((err) => {
      console.error("E-mail notificatie mislukt:", err);
    });
}
