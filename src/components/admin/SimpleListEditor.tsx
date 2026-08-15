"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Field, TextInput, TextArea, CheckboxField } from "./fields";
import { SubmitButton } from "./ui";

export type FieldConfig =
  | { name: string; label: string; type: "text" | "number"; placeholder?: string }
  | { name: string; label: string; type: "textarea"; placeholder?: string }
  | { name: string; label: string; type: "checkbox" };

type Row = Record<string, unknown> & { id: string; locale?: string };

/**
 * Config-driven CRUD for the "locale-scoped list of a few scalar fields"
 * shape shared by nav links, stats, journey steps, testimonials, FAQs, etc.
 * `createAction` / `updateAction` / `deleteAction` are Server Actions bound
 * by the page that renders this.
 */
export default function SimpleListEditor({
  items,
  fields,
  locales,
  createAction,
  updateAction,
  deleteAction,
  addLabel = "Add",
}: {
  items: Row[];
  fields: FieldConfig[];
  locales?: readonly string[];
  createAction: (formData: FormData) => void;
  updateAction: (formData: FormData) => void;
  deleteAction: (formData: FormData) => void;
  addLabel?: string;
}) {
  const [locale, setLocale] = useState<string | undefined>(locales?.[0]);
  const visible = locale ? items.filter((i) => i.locale === locale) : items;

  return (
    <div className="space-y-6">
      {locales && (
        <Tabs value={locale} onValueChange={(v) => setLocale(v as string)}>
          <TabsList>
            {locales.map((l) => (
              <TabsTrigger key={l} value={l}>
                {l.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="space-y-4">
        {visible.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <form action={updateAction} className="space-y-4">
                <input type="hidden" name="id" value={item.id} />
                {item.locale && (
                  <input type="hidden" name="locale" value={item.locale as string} />
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((f) => (
                    <RowField key={f.name} field={f} defaultValue={item[f.name]} />
                  ))}
                  <Field label="Order">
                    <TextInput type="number" name="order" defaultValue={String(item.order ?? 0)} />
                  </Field>
                </div>
                <div className="flex items-center gap-2">
                  <SubmitButton>Save</SubmitButton>
                  <SubmitButton
                    variant="destructive"
                    formAction={deleteAction}
                    confirm="Delete this? This cannot be undone."
                  >
                    Delete
                  </SubmitButton>
                </div>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>

      <details className="rounded-xl border border-dashed border-border p-5">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          {addLabel}
        </summary>
        <form action={createAction} className="mt-4 space-y-4">
          {locale && <input type="hidden" name="locale" value={locale} />}
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <RowField key={f.name} field={f} />
            ))}
            <Field label="Order">
              <TextInput type="number" name="order" defaultValue={String(items.length)} />
            </Field>
          </div>
          <SubmitButton>Add</SubmitButton>
        </form>
      </details>
    </div>
  );
}

function RowField({ field, defaultValue }: { field: FieldConfig; defaultValue?: unknown }) {
  if (field.type === "checkbox") {
    return (
      <CheckboxField
        name={field.name}
        label={field.label}
        defaultChecked={Boolean(defaultValue)}
      />
    );
  }
  if (field.type === "textarea") {
    return (
      <div className="sm:col-span-2">
        <Field label={field.label}>
          <TextArea
            name={field.name}
            rows={3}
            placeholder={field.placeholder}
            defaultValue={typeof defaultValue === "string" ? defaultValue : ""}
          />
        </Field>
      </div>
    );
  }
  return (
    <Field label={field.label}>
      <TextInput
        name={field.name}
        type={field.type === "number" ? "number" : "text"}
        placeholder={field.placeholder}
        defaultValue={
          typeof defaultValue === "string" || typeof defaultValue === "number"
            ? defaultValue
            : ""
        }
      />
    </Field>
  );
}
