/**
 * Runs once when the Next.js server boots (dev and prod). Used to seed the
 * database on first run — see `prisma/seed.ts` for the idempotent logic
 * (it never overwrites content already edited from `/admin`).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { runSeed } = await import("../prisma/seed");
  const { prisma } = await import("@/lib/prisma");

  try {
    await runSeed(prisma);
  } catch (err) {
    console.error("[instrumentation] database seed failed:", err);
  }
}
