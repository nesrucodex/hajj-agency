import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/fields";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { LOCALES } from "@/lib/content";
import { createFaq, updateFaq, deleteFaq } from "./actions";

export default async function FaqPage() {
  const items = await prisma.faq.findMany({ orderBy: [{ locale: "asc" }, { order: "asc" }] });

  return (
    <div>
      <PageHeader title="FAQ" description="Frequently asked questions." />
      <SimpleListEditor
        items={items}
        locales={LOCALES}
        fields={[
          { name: "q", label: "Question", type: "text" },
          { name: "a", label: "Answer", type: "textarea" },
          { name: "active", label: "Active (shown on the site)", type: "checkbox" },
        ]}
        createAction={createFaq}
        updateAction={updateFaq}
        deleteAction={deleteFaq}
        addLabel="Add a question"
      />
    </div>
  );
}
