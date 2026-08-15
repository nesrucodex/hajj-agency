"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/auth/dal";
import { str, num, bool } from "@/lib/admin/form";
import type { Locale } from "@/lib/content";

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/faq");
}

export async function createFaq(formData: FormData) {
  await verifyAdminSession();
  await prisma.faq.create({
    data: {
      locale: str(formData, "locale") as Locale,
      q: str(formData, "q"),
      a: str(formData, "a"),
      active: bool(formData, "active"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function updateFaq(formData: FormData) {
  await verifyAdminSession();
  await prisma.faq.update({
    where: { id: str(formData, "id") },
    data: {
      q: str(formData, "q"),
      a: str(formData, "a"),
      active: bool(formData, "active"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function deleteFaq(formData: FormData) {
  await verifyAdminSession();
  await prisma.faq.delete({ where: { id: str(formData, "id") } });
  refresh();
}
