"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/auth/dal";
import { str, num, bool, lines } from "@/lib/admin/form";
import type { Locale } from "@/lib/content";

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/packages");
}

function category(formData: FormData): "hajj" | "umrah" {
  return str(formData, "category") === "hajj" ? "hajj" : "umrah";
}

export async function updatePackagesCopy(formData: FormData) {
  await verifyAdminSession();
  const locale = str(formData, "locale") as Locale;
  await prisma.siteSettings.update({
    where: { locale },
    data: {
      packagesEyebrow: str(formData, "packagesEyebrow"),
      packagesTitle: str(formData, "packagesTitle"),
      packagesSubtitle: str(formData, "packagesSubtitle"),
    },
  });
  refresh();
}

export async function createPackage(formData: FormData) {
  await verifyAdminSession();
  await prisma.package.create({
    data: {
      locale: str(formData, "locale") as Locale,
      category: category(formData),
      name: str(formData, "name"),
      tier: str(formData, "tier"),
      price: str(formData, "price"),
      duration: str(formData, "duration"),
      summary: str(formData, "summary"),
      features: lines(formData, "features"),
      featured: bool(formData, "featured"),
      active: bool(formData, "active"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function updatePackage(formData: FormData) {
  await verifyAdminSession();
  await prisma.package.update({
    where: { id: str(formData, "id") },
    data: {
      category: category(formData),
      name: str(formData, "name"),
      tier: str(formData, "tier"),
      price: str(formData, "price"),
      duration: str(formData, "duration"),
      summary: str(formData, "summary"),
      features: lines(formData, "features"),
      featured: bool(formData, "featured"),
      active: bool(formData, "active"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function deletePackage(formData: FormData) {
  await verifyAdminSession();
  await prisma.package.delete({ where: { id: str(formData, "id") } });
  refresh();
}
