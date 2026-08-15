"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/auth/dal";
import { str, num, bool } from "@/lib/admin/form";
import type { Locale } from "@/lib/content";

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function createTestimonial(formData: FormData) {
  await verifyAdminSession();
  await prisma.testimonial.create({
    data: {
      locale: str(formData, "locale") as Locale,
      quote: str(formData, "quote"),
      name: str(formData, "name"),
      trip: str(formData, "trip"),
      rating: num(formData, "rating", 5),
      active: bool(formData, "active"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function updateTestimonial(formData: FormData) {
  await verifyAdminSession();
  await prisma.testimonial.update({
    where: { id: str(formData, "id") },
    data: {
      quote: str(formData, "quote"),
      name: str(formData, "name"),
      trip: str(formData, "trip"),
      rating: num(formData, "rating", 5),
      active: bool(formData, "active"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function deleteTestimonial(formData: FormData) {
  await verifyAdminSession();
  await prisma.testimonial.delete({ where: { id: str(formData, "id") } });
  refresh();
}
