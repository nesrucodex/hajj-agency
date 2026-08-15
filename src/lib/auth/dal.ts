import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession, type SessionPayload } from "./session";

/**
 * The one place every protected admin page/Server Action goes through.
 * `proxy.ts` does an optimistic cookie-presence check before this ever runs;
 * this is the real verification (signature + expiry).
 */
export const verifyAdminSession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/admin/login");
  }
  return session;
});

/** Same check, but returns null instead of redirecting — for optional UI. */
export const getAdminSession = cache(async (): Promise<SessionPayload | null> => {
  return getSession();
});
