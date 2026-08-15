import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import * as seed from "./seed-data";
import type { LocaleCode } from "./seed-data";

const LOCALES: LocaleCode[] = ["am", "en"];

function makeClient() {
  const connectionString = process.env.POSTGRES_URI;
  if (!connectionString) {
    throw new Error("POSTGRES_URI is not set");
  }
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

/**
 * Populates a brand-new database and is safe to run on every server boot:
 * - the admin account is created once and never touched again (so a changed
 *   password survives restarts);
 * - every other table is only ever seeded while it's still empty, so admin
 *   edits from `/admin` are never overwritten.
 */
export async function runSeed(prisma: PrismaClient = makeClient()) {
  await seedAdminUser(prisma);
  await seedSiteSettings(prisma);
  await seedIfEmpty("Promo", () => prisma.promo.count(), () =>
    Promise.all(
      LOCALES.flatMap((locale) =>
        seed.promos[locale].map((promo, order) =>
          prisma.promo.create({ data: { locale, order, ...promo } }),
        ),
      ),
    ),
  );
  await seedIfEmpty("Package", () => prisma.package.count(), () =>
    Promise.all(
      LOCALES.flatMap((locale) =>
        seed.packages[locale].map((pkg, order) =>
          prisma.package.create({ data: { locale, order, ...pkg } }),
        ),
      ),
    ),
  );
  await seedIfEmpty("Testimonial", () => prisma.testimonial.count(), () =>
    Promise.all(
      LOCALES.flatMap((locale) =>
        seed.testimonials[locale].map((item, order) =>
          prisma.testimonial.create({ data: { locale, order, ...item } }),
        ),
      ),
    ),
  );
  await seedIfEmpty("Faq", () => prisma.faq.count(), () =>
    Promise.all(
      LOCALES.flatMap((locale) =>
        seed.faqs[locale].map((item, order) =>
          prisma.faq.create({ data: { locale, order, ...item } }),
        ),
      ),
    ),
  );
  const supplierRecord = await seedIfEmpty(
    "Supplier",
    () => prisma.supplier.count({ where: { name: seed.supplier.name } }),
    () => prisma.supplier.create({ data: seed.supplier }),
    () => prisma.supplier.findFirst({ where: { name: seed.supplier.name } }),
  );

  // Seeded per-hotel (by name), not gated on the table being empty: an
  // earlier boot may have inserted some hotels before failing partway
  // through, and this fills in only what's still missing.
  const existingHotelNames = new Set(
    (await prisma.hotel.findMany({ select: { name: true } })).map((h) => h.name),
  );
  const missingHotels = seed.hotels.filter((h) => !existingHotelNames.has(h.name));
  if (missingHotels.length > 0) {
    let order = existingHotelNames.size;
    for (const { rates, ...hotelFields } of missingHotels) {
      await prisma.hotel.create({
        data: {
          ...hotelFields,
          order: order++,
          supplierId: supplierRecord?.id,
          rates: { create: rates },
        },
      });
    }
    console.log(`[seed] Hotel: created ${missingHotels.length} missing hotel(s)`);
  } else {
    console.log(`[seed] Hotel: already has ${existingHotelNames.size} row(s) — skipping`);
  }

  console.log("[seed] done.");
}

async function seedAdminUser(prisma: PrismaClient) {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  if (!username || !password) {
    console.warn("[seed] USERNAME/PASSWORD env vars not set — skipping admin user.");
    return;
  }
  const existing = await prisma.adminUser.findUnique({ where: { username } });
  if (existing) return; // never reset a password that may have changed since
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.create({ data: { username, passwordHash } });
  console.log(`[seed] AdminUser: created "${username}"`);
}

async function seedSiteSettings(prisma: PrismaClient) {
  for (const locale of LOCALES) {
    const existing = await prisma.siteSettings.findUnique({ where: { locale } });
    if (existing) continue;
    await prisma.siteSettings.create({ data: { locale, ...seed.siteSettings[locale] } });
    console.log(`[seed] SiteSettings: created "${locale}"`);
  }
}

async function seedIfEmpty<T>(
  label: string,
  count: () => Promise<number>,
  run: () => Promise<T>,
  getExisting?: () => Promise<T | null>,
): Promise<T | undefined> {
  const n = await count();
  if (n > 0) {
    console.log(`[seed] ${label}: already has ${n} row(s) — skipping`);
    return getExisting ? ((await getExisting()) ?? undefined) : undefined;
  }
  const result = await run();
  console.log(`[seed] ${label}: seeded`);
  return result;
}

// Allow `pnpm db:seed` (tsx prisma/seed.ts) to run this directly, while
// `src/instrumentation.ts` imports `runSeed` and supplies its own client.
if (require.main === module) {
  runSeed().catch((err) => {
    console.error("[seed] failed:", err);
    process.exitCode = 1;
  });
}
