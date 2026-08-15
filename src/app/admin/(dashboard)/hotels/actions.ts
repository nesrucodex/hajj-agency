"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { verifyAdminSession } from "@/lib/auth/dal";
import { str, num, optNum, optStr, bool } from "@/lib/admin/form";

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/hotels");
}

function city(formData: FormData): "makkah" | "madinah" {
  return str(formData, "city") === "madinah" ? "madinah" : "makkah";
}

function dateField(formData: FormData, name: string): Date | null {
  const v = str(formData, name);
  return v ? new Date(`${v}T00:00:00.000Z`) : null;
}

export async function createHotel(formData: FormData) {
  await verifyAdminSession();
  await prisma.hotel.create({
    data: {
      city: city(formData),
      name: str(formData, "name"),
      nameAr: optStr(formData, "nameAr") ?? null,
      stars: optNum(formData, "stars") ?? null,
      periodFrom: dateField(formData, "periodFrom"),
      periodTo: dateField(formData, "periodTo"),
      breakfast: optStr(formData, "breakfast") ?? null,
      lunch: optStr(formData, "lunch") ?? null,
      haramView: optStr(formData, "haramView") ?? null,
      kaabaView: optStr(formData, "kaabaView") ?? null,
      currency: optStr(formData, "currency") ?? "SAR",
      published: bool(formData, "published"),
      featured: bool(formData, "featured"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function updateHotel(formData: FormData) {
  await verifyAdminSession();
  await prisma.hotel.update({
    where: { id: str(formData, "id") },
    data: {
      city: city(formData),
      name: str(formData, "name"),
      nameAr: optStr(formData, "nameAr") ?? null,
      stars: optNum(formData, "stars") ?? null,
      periodFrom: dateField(formData, "periodFrom"),
      periodTo: dateField(formData, "periodTo"),
      breakfast: optStr(formData, "breakfast") ?? null,
      lunch: optStr(formData, "lunch") ?? null,
      haramView: optStr(formData, "haramView") ?? null,
      kaabaView: optStr(formData, "kaabaView") ?? null,
      currency: optStr(formData, "currency") ?? "SAR",
      published: bool(formData, "published"),
      featured: bool(formData, "featured"),
      order: num(formData, "order"),
    },
  });
  refresh();
}

export async function deleteHotel(formData: FormData) {
  await verifyAdminSession();
  await prisma.hotel.delete({ where: { id: str(formData, "id") } });
  refresh();
}

function dayType(formData: FormData): "WD" | "WE" | "ALL" {
  const v = str(formData, "dayType");
  return v === "WD" || v === "WE" ? v : "ALL";
}

export async function createHotelRate(formData: FormData) {
  await verifyAdminSession();
  await prisma.hotelRate.create({
    data: {
      hotelId: str(formData, "hotelId"),
      dayType: dayType(formData),
      dbl: optNum(formData, "dbl") ?? null,
      trp: optNum(formData, "trp") ?? null,
      quad: optNum(formData, "quad") ?? null,
    },
  });
  refresh();
}

export async function updateHotelRate(formData: FormData) {
  await verifyAdminSession();
  await prisma.hotelRate.update({
    where: { id: str(formData, "id") },
    data: {
      dayType: dayType(formData),
      dbl: optNum(formData, "dbl") ?? null,
      trp: optNum(formData, "trp") ?? null,
      quad: optNum(formData, "quad") ?? null,
    },
  });
  refresh();
}

export async function deleteHotelRate(formData: FormData) {
  await verifyAdminSession();
  await prisma.hotelRate.delete({ where: { id: str(formData, "id") } });
  refresh();
}

export async function updateSupplier(formData: FormData) {
  await verifyAdminSession();
  let contacts: unknown = [];
  try {
    contacts = JSON.parse(str(formData, "contacts") || "[]");
  } catch {
    throw new Error("Contacts must be valid JSON.");
  }

  const id = str(formData, "id");
  const data = {
    name: str(formData, "name"),
    bankName: optStr(formData, "bankName") ?? null,
    accountName: optStr(formData, "accountName") ?? null,
    accountNumber: optStr(formData, "accountNumber") ?? null,
    iban: optStr(formData, "iban") ?? null,
    swiftCode: optStr(formData, "swiftCode") ?? null,
    contacts: contacts as Prisma.InputJsonValue,
    notes: optStr(formData, "notes") ?? null,
  };

  if (id) {
    await prisma.supplier.update({ where: { id }, data });
  } else {
    await prisma.supplier.create({ data });
  }
  revalidatePath("/admin/hotels");
}
