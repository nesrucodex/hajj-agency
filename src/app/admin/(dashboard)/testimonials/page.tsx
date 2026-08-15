import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/fields";
import SimpleListEditor from "@/components/admin/SimpleListEditor";
import { LOCALES } from "@/lib/content";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "./actions";

export default async function TestimonialsPage() {
  const items = await prisma.testimonial.findMany({
    orderBy: [{ locale: "asc" }, { order: "asc" }],
  });

  return (
    <div>
      <PageHeader title="Testimonials" description="Pilgrim reviews." />
      <SimpleListEditor
        items={items}
        locales={LOCALES}
        fields={[
          { name: "quote", label: "Quote", type: "textarea" },
          { name: "name", label: "Name", type: "text" },
          { name: "trip", label: "Trip (e.g. Umrah Noor · 2024)", type: "text" },
          { name: "rating", label: "Rating (1–5)", type: "number" },
          { name: "active", label: "Active (shown on the site)", type: "checkbox" },
        ]}
        createAction={createTestimonial}
        updateAction={updateTestimonial}
        deleteAction={deleteTestimonial}
        addLabel="Add a testimonial"
      />
    </div>
  );
}
