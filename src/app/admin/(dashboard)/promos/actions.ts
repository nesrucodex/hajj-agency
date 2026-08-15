"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/auth/dal";
import { str, num, bool } from "@/lib/admin/form";
import type { Locale } from "@/lib/content";

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/promos");
}

function season(formData: FormData): "hajj" | "ramadan" | "default" {
  const v = str(formData, "season");
  return v === "hajj" || v === "ramadan" ? v : "default";
}

export async function createPromo(formData: FormData) {
  await verifyAdminSession();
  await prisma.promo.create({
    data: {
      locale: str(formData, "locale") as Locale,
      season: season(formData),
      active: bool(formData, "active"),
      badge: str(formData, "badge"),
      title: str(formData, "title"),
      detail: str(formData, "detail"),
      ctaLabel: str(formData, "ctaLabel"),
      ctaHref: str(formData, "ctaHref"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function updatePromo(formData: FormData) {
  await verifyAdminSession();
  await prisma.promo.update({
    where: { id: str(formData, "id") },
    data: {
      season: season(formData),
      active: bool(formData, "active"),
      badge: str(formData, "badge"),
      title: str(formData, "title"),
      detail: str(formData, "detail"),
      ctaLabel: str(formData, "ctaLabel"),
      ctaHref: str(formData, "ctaHref"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function deletePromo(formData: FormData) {
  await verifyAdminSession();
  await prisma.promo.delete({ where: { id: str(formData, "id") } });
  refresh();
}
