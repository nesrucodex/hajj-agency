import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/fields";
import SettingsForm from "@/components/admin/SettingsForm";
import type { FieldConfig } from "@/components/admin/SimpleListEditor";
import { updateBrand } from "./actions";

const FIELDS: FieldConfig[] = [
  { name: "brandName", label: "Brand name (short)", type: "text" },
  { name: "brandFullName", label: "Brand full name", type: "text" },
  { name: "tagline", label: "Tagline", type: "text" },
  { name: "establishedYear", label: "Established year", type: "text" },
  { name: "establishedLabel", label: "Established label (e.g. EST.)", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "phoneAlt", label: "Phone (alt)", type: "text" },
  { name: "whatsapp", label: "WhatsApp number", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "accreditation", label: "Accreditation line", type: "text" },
  { name: "bismillah", label: "Bismillah (Arabic)", type: "text" },
  { name: "bismillahTranslit", label: "Bismillah (translation)", type: "text" },
  { name: "socialFacebook", label: "Facebook URL", type: "text" },
  { name: "socialInstagram", label: "Instagram URL", type: "text" },
  { name: "socialTiktok", label: "TikTok URL", type: "text" },
  { name: "metaTitle", label: "SEO title", type: "text" },
  { name: "metaDescription", label: "SEO description", type: "textarea" },
];

export default async function BrandPage() {
  const settings = await prisma.siteSettings.findMany({ orderBy: { locale: "asc" } });

  return (
    <div>
      <PageHeader
        title="Brand & SEO"
        description="Contact details, social links and search-engine title/description, per language."
      />
      <SettingsForm settings={settings} fields={FIELDS} action={updateBrand} />
    </div>
  );
}
