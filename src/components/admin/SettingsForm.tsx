"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, TextInput, TextArea } from "./fields";
import { SubmitButton } from "./ui";
import type { FieldConfig } from "./SimpleListEditor";

type Settings = Record<string, unknown> & { locale: string };

/**
 * One form per locale (tabbed) for the "singleton settings row" shape used
 * by Brand, Hero copy, About copy, Journey copy, etc. `action` is a Server
 * Action bound by the page that renders this; it always receives a `locale`
 * field plus every field named in `fields`.
 */
export default function SettingsForm({
  settings,
  fields,
  action,
}: {
  settings: Settings[];
  fields: FieldConfig[];
  action: (formData: FormData) => void;
}) {
  const [locale, setLocale] = useState(settings[0]?.locale ?? "am");
  const current = settings.find((s) => s.locale === locale) ?? settings[0];

  return (
    <div className="space-y-6">
      <Tabs value={locale} onValueChange={(v) => setLocale(v as string)}>
        <TabsList>
          {settings.map((s) => (
            <TabsTrigger key={s.locale} value={s.locale}>
              {s.locale.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <form key={current.locale} action={action} className="space-y-5">
        <input type="hidden" name="locale" value={current.locale} />
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <RowField key={f.name} field={f} defaultValue={current[f.name]} />
          ))}
        </div>
        <SubmitButton>Save {current.locale.toUpperCase()} changes</SubmitButton>
      </form>
    </div>
  );
}

function RowField({ field, defaultValue }: { field: FieldConfig; defaultValue?: unknown }) {
  if (field.type === "textarea") {
    return (
      <div className="sm:col-span-2">
        <Field label={field.label}>
          <TextArea
            name={field.name}
            rows={4}
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
        placeholder={field.type === "checkbox" ? undefined : field.placeholder}
        defaultValue={
          typeof defaultValue === "string" || typeof defaultValue === "number"
            ? defaultValue
            : ""
        }
      />
    </Field>
  );
}
