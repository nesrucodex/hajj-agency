import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/fields";
import HotelsEditor from "./HotelsEditor";
import SupplierPanel from "./SupplierPanel";

export default async function HotelsPage() {
  const [hotels, supplier] = await Promise.all([
    prisma.hotel.findMany({
      orderBy: [{ city: "asc" }, { order: "asc" }],
      include: { rates: true },
    }),
    prisma.supplier.findFirst(),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Hotels & rates"
        description="The Makkah / Madinah hotel options shown publicly, with their net rates."
      />
      <HotelsEditor hotels={hotels} />
      <SupplierPanel supplier={supplier} />
    </div>
  );
}
