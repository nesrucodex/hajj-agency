import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Prisma client singleton, connected via the `pg` driver adapter (required
 * since Prisma 7 — PrismaClient no longer reads a datasource URL from the
 * schema, only `prisma.config.ts` does, and only for the CLI).
 *
 * Next.js dev mode hot-reloads modules, which would otherwise create a fresh
 * PrismaClient (and a fresh pool of connections to Neon) on every edit —
 * stash the instance on `globalThis` to avoid that.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const connectionString = process.env.POSTGRES_URI;
  if (!connectionString) {
    throw new Error("POSTGRES_URI is not set");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
