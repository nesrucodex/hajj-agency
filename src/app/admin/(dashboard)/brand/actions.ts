"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/auth/dal";
import { str, optStr } from "@/lib/admin/form";
import type { Locale } from "@/lib/content";

export async function updateBrand(formData: FormData) {
  await verifyAdminSession();
  const locale = str(formData, "locale") as Locale;

  await prisma.siteSettings.update({
    where: { locale },
    data: {
      brandName: str(formData, "brandName"),
      brandFullName: str(formData, "brandFullName"),
      tagline: str(formData, "tagline"),
      bismillah: str(formData, "bismillah"),
      bismillahTranslit: str(formData, "bismillahTranslit"),
      establishedYear: str(formData, "establishedYear"),
      establishedLabel: optStr(formData, "establishedLabel") ?? null,
      phone: str(formData, "phone"),
      phoneAlt: optStr(formData, "phoneAlt") ?? null,
      whatsapp: str(formData, "whatsapp"),
      email: str(formData, "email"),
      address: str(formData, "address"),
      accreditation: str(formData, "accreditation"),
      socialFacebook: optStr(formData, "socialFacebook") ?? null,
      socialInstagram: optStr(formData, "socialInstagram") ?? null,
      socialTiktok: optStr(formData, "socialTiktok") ?? null,
      metaTitle: optStr(formData, "metaTitle") ?? null,
      metaDescription: optStr(formData, "metaDescription") ?? null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/brand");
}
