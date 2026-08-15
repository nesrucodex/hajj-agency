import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSession, SESSION_COOKIE } from "@/lib/auth/session";

/**
 * Optimistic auth check for /admin — reads the session cookie only (no DB
 * hit), matching the pattern in the Next.js auth guide. The real check
 * (signature + expiry via `verifyAdminSession`) runs again in the dashboard
 * layout and every Server Action, since Proxy alone isn't a full auth
 * boundary (e.g. it can be bypassed if a matcher is later narrowed).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await decryptSession(cookie);

  const isLoginPage = pathname === "/admin/login";

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
