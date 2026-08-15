import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/fields";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { LOCALES } from "@/lib/content";
import { createPromo, updatePromo, deletePromo } from "./actions";

export default async function PromosPage() {
  const promos = await prisma.promo.findMany({
    orderBy: [{ locale: "asc" }, { order: "asc" }],
  });

  return (
    <div>
      <PageHeader
        title="Promo banner"
        description={
          'The gold banner at the top of the site. "season" must be exactly "hajj", ' +
          '"ramadan" or "default" — the site shows whichever matches the current Hijri month, ' +
          'falling back to "default".'
        }
      />
      <SimpleListEditor
        items={promos}
        locales={LOCALES}
        fields={[
          { name: "season", label: "Season (hajj / ramadan / default)", type: "text" },
          { name: "active", label: "Active", type: "checkbox" },
          { name: "badge", label: "Badge", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "detail", label: "Detail", type: "text" },
          { name: "ctaLabel", label: "Button label", type: "text" },
          { name: "ctaHref", label: "Button link", type: "text" },
        ]}
        createAction={createPromo}
        updateAction={updatePromo}
        deleteAction={deletePromo}
        addLabel="Add a promo"
      />
    </div>
  );
}
