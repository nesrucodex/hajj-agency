import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7 config: used by the CLI (`prisma db push`, `prisma generate`,
// `prisma studio`, ...). The application's own PrismaClient instance
// (src/lib/prisma.ts) connects separately via a driver adapter — this file
// only drives the CLI.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("POSTGRES_URI"),
  },
});
