"use client";

import { Field, TextInput, TextArea } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/ui";
import { updateSupplier } from "./actions";

interface SupplierRow {
  id: string;
  name: string;
  bankName: string | null;
  accountName: string | null;
  accountNumber: string | null;
  iban: string | null;
  swiftCode: string | null;
  contacts: unknown;
  notes: string | null;
}

export default function SupplierPanel({ supplier }: { supplier: SupplierRow | null }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-red-400/40 bg-red-50/40 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
        Private — never shown on the public site
      </p>
      <p className="mt-1 text-sm text-body-soft">
        Banking and internal contact details for the hotel supplier, kept here for your own
        bookings and payments.
      </p>

      <form action={updateSupplier} className="mt-5 grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="id" value={supplier?.id ?? ""} />
        <Field label="Supplier name">
          <TextInput name="name" defaultValue={supplier?.name ?? ""} required />
        </Field>
        <Field label="Bank name">
          <TextInput name="bankName" defaultValue={supplier?.bankName ?? ""} />
        </Field>
        <Field label="Account name">
          <TextInput name="accountName" defaultValue={supplier?.accountName ?? ""} />
        </Field>
        <Field label="Account number">
          <TextInput name="accountNumber" defaultValue={supplier?.accountNumber ?? ""} />
        </Field>
        <Field label="IBAN">
          <TextInput name="iban" defaultValue={supplier?.iban ?? ""} />
        </Field>
        <Field label="SWIFT code">
          <TextInput name="swiftCode" defaultValue={supplier?.swiftCode ?? ""} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Contacts (JSON array of { name, phone, email })">
            <TextArea
              name="contacts"
              rows={4}
              defaultValue={JSON.stringify(supplier?.contacts ?? [], null, 2)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Notes">
            <TextArea name="notes" rows={4} defaultValue={supplier?.notes ?? ""} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <SubmitButton>Save supplier info</SubmitButton>
        </div>
      </form>
    </div>
  );
}
