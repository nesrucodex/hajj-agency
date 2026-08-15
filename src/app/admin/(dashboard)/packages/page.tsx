import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/admin/fields";
import SettingsForm from "@/components/admin/SettingsForm";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { LOCALES } from "@/lib/content";
import { updatePackagesCopy, createPackage, updatePackage, deletePackage } from "./actions";

export default async function PackagesPage() {
  const [settings, packages] = await Promise.all([
    prisma.siteSettings.findMany({ orderBy: { locale: "asc" } }),
    prisma.package.findMany({ orderBy: [{ locale: "asc" }, { order: "asc" }] }),
  ]);

  const packagesForForm = packages.map((p) => ({
    ...p,
    features: (p.features as string[]).join("\n"),
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Packages"
        description="The Hajj / Umrah cards. Category must be exactly “hajj” or “umrah”."
      />
      <Card title="Copy">
        <SettingsForm
          settings={settings}
          fields={[
            { name: "packagesEyebrow", label: "Eyebrow", type: "text" },
            { name: "packagesTitle", label: "Title", type: "text" },
            { name: "packagesSubtitle", label: "Subtitle", type: "textarea" },
          ]}
          action={updatePackagesCopy}
        />
      </Card>
      <Card title="Packages">
        <SimpleListEditor
          items={packagesForForm}
          locales={LOCALES}
          fields={[
            { name: "category", label: "Category (hajj / umrah)", type: "text" },
            { name: "name", label: "Name", type: "text" },
            { name: "tier", label: "Tier", type: "text" },
            { name: "price", label: "Price label", type: "text" },
            { name: "duration", label: "Duration", type: "text" },
            { name: "summary", label: "Summary", type: "textarea" },
            { name: "features", label: "Features (one per line)", type: "textarea" },
            { name: "featured", label: "Featured (highlighted card)", type: "checkbox" },
            { name: "active", label: "Active (shown on the site)", type: "checkbox" },
          ]}
          createAction={createPackage}
          updateAction={updatePackage}
          deleteAction={deletePackage}
          addLabel="Add a package"
        />
      </Card>
    </div>
  );
}
