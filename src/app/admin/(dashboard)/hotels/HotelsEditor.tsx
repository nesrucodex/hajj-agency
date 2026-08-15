"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Field, TextInput, Select, CheckboxField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/ui";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  createHotelRate,
  updateHotelRate,
  deleteHotelRate,
} from "./actions";

interface RateRow {
  id: string;
  dayType: "WD" | "WE" | "ALL";
  dbl: number | null;
  trp: number | null;
  quad: number | null;
}
interface HotelRow {
  id: string;
  city: "makkah" | "madinah";
  name: string;
  nameAr: string | null;
  stars: number | null;
  periodFrom: Date | null;
  periodTo: Date | null;
  breakfast: string | null;
  lunch: string | null;
  haramView: string | null;
  kaabaView: string | null;
  currency: string;
  published: boolean;
  featured: boolean;
  order: number;
  rates: RateRow[];
}

function toDateInput(d: Date | null) {
  return d ? d.toISOString().slice(0, 10) : "";
}

function RateForm({ hotelId, rate }: { hotelId: string; rate?: RateRow }) {
  return (
    <form
      action={rate ? updateHotelRate : createHotelRate}
      className="flex flex-wrap items-end gap-2 rounded-lg bg-muted/50 p-3"
    >
      <input type="hidden" name={rate ? "id" : "hotelId"} value={rate ? rate.id : hotelId} />
      <div className="w-28">
        <Field label="Days">
          <Select name="dayType" defaultValue={rate?.dayType ?? "ALL"}>
            <option value="WD">Weekday</option>
            <option value="WE">Weekend</option>
            <option value="ALL">Every night</option>
          </Select>
        </Field>
      </div>
      <div className="w-24">
        <Field label="Double">
          <TextInput type="number" name="dbl" defaultValue={rate?.dbl ?? ""} />
        </Field>
      </div>
      <div className="w-24">
        <Field label="Triple">
          <TextInput type="number" name="trp" defaultValue={rate?.trp ?? ""} />
        </Field>
      </div>
      <div className="w-24">
        <Field label="Quad">
          <TextInput type="number" name="quad" defaultValue={rate?.quad ?? ""} />
        </Field>
      </div>
      <SubmitButton>{rate ? "Save" : "Add rate"}</SubmitButton>
      {rate && (
        <SubmitButton variant="destructive" formAction={deleteHotelRate} confirm="Delete this rate row?">
          Delete
        </SubmitButton>
      )}
    </form>
  );
}

function HotelCard({ hotel }: { hotel: HotelRow }) {
  return (
    <details className="rounded-xl border bg-card">
      <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4">
        <span className="font-medium text-foreground">
          {hotel.name}
          {hotel.stars ? ` · ${hotel.stars}★` : ""}
        </span>
        <div className="flex items-center gap-2">
          {hotel.featured && <Badge variant="outline">Featured</Badge>}
          <Badge variant={hotel.published ? "default" : "secondary"}>
            {hotel.published ? "Published" : "Hidden"}
          </Badge>
        </div>
      </summary>

      <div className="space-y-4 border-t px-5 py-4">
        <form action={updateHotel} className="grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="id" value={hotel.id} />
          <Field label="Name">
            <TextInput name="name" defaultValue={hotel.name} />
          </Field>
          <Field label="Name (Arabic)">
            <TextInput name="nameAr" defaultValue={hotel.nameAr ?? ""} dir="rtl" />
          </Field>
          <Field label="City">
            <Select name="city" defaultValue={hotel.city}>
              <option value="makkah">Makkah</option>
              <option value="madinah">Madinah</option>
            </Select>
          </Field>
          <Field label="Stars">
            <TextInput type="number" name="stars" min={1} max={5} defaultValue={hotel.stars ?? ""} />
          </Field>
          <Field label="Period from">
            <TextInput type="date" name="periodFrom" defaultValue={toDateInput(hotel.periodFrom)} />
          </Field>
          <Field label="Period to">
            <TextInput type="date" name="periodTo" defaultValue={toDateInput(hotel.periodTo)} />
          </Field>
          <Field label="Breakfast (e.g. Incl. / R.O / 75)">
            <TextInput name="breakfast" defaultValue={hotel.breakfast ?? ""} />
          </Field>
          <Field label="Lunch">
            <TextInput name="lunch" defaultValue={hotel.lunch ?? ""} />
          </Field>
          <Field label="Haram view price">
            <TextInput name="haramView" defaultValue={hotel.haramView ?? ""} />
          </Field>
          <Field label="Kaaba view price">
            <TextInput name="kaabaView" defaultValue={hotel.kaabaView ?? ""} />
          </Field>
          <Field label="Currency">
            <TextInput name="currency" defaultValue={hotel.currency} />
          </Field>
          <Field label="Order">
            <TextInput type="number" name="order" defaultValue={hotel.order} />
          </Field>
          <div className="sm:col-span-2 flex flex-col gap-2">
            <CheckboxField
              name="published"
              label="Published (listed in the public Hotels section)"
              defaultChecked={hotel.published}
            />
            <CheckboxField
              name="featured"
              label="Featured (shown by default, in the compact highlight grid)"
              defaultChecked={hotel.featured}
            />
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <SubmitButton>Save hotel</SubmitButton>
            <SubmitButton
              variant="destructive"
              formAction={deleteHotel}
              confirm={`Delete "${hotel.name}" and all its rates?`}
            >
              Delete hotel
            </SubmitButton>
          </div>
        </form>

        <div className="space-y-2 border-t pt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Rates
          </p>
          {hotel.rates.map((rate) => (
            <RateForm key={rate.id} hotelId={hotel.id} rate={rate} />
          ))}
          <RateForm hotelId={hotel.id} />
        </div>
      </div>
    </details>
  );
}

export default function HotelsEditor({ hotels }: { hotels: HotelRow[] }) {
  const [city, setCity] = useState<"makkah" | "madinah">("makkah");
  const visible = hotels.filter((h) => h.city === city);

  return (
    <div className="space-y-6">
      <Tabs value={city} onValueChange={(v) => setCity(v as "makkah" | "madinah")}>
        <TabsList>
          {(["makkah", "madinah"] as const).map((c) => (
            <TabsTrigger key={c} value={c} className="capitalize">
              {c} ({hotels.filter((h) => h.city === c).length})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {visible.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>

      <details className="rounded-xl border border-dashed border-border p-5">
        <summary className="cursor-pointer text-sm font-medium text-foreground">Add a hotel</summary>
        <form action={createHotel} className="mt-4 grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="city" value={city} />
          <Field label="Name">
            <TextInput name="name" required />
          </Field>
          <Field label="Name (Arabic)">
            <TextInput name="nameAr" dir="rtl" />
          </Field>
          <Field label="Stars">
            <TextInput type="number" name="stars" min={1} max={5} />
          </Field>
          <Field label="Currency">
            <TextInput name="currency" defaultValue="SAR" />
          </Field>
          <Field label="Period from">
            <TextInput type="date" name="periodFrom" />
          </Field>
          <Field label="Period to">
            <TextInput type="date" name="periodTo" />
          </Field>
          <Field label="Breakfast">
            <TextInput name="breakfast" />
          </Field>
          <Field label="Lunch">
            <TextInput name="lunch" />
          </Field>
          <div className="sm:col-span-2 flex flex-col gap-2">
            <CheckboxField name="published" label="Published" defaultChecked />
            <CheckboxField name="featured" label="Featured (shown by default on the homepage)" />
          </div>
          <div className="sm:col-span-2">
            <SubmitButton>Add hotel</SubmitButton>
          </div>
        </form>
      </details>
    </div>
  );
}
