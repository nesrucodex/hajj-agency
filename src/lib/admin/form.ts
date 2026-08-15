import "server-only";

export function str(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

export function optStr(formData: FormData, name: string): string | undefined {
  const v = str(formData, name);
  return v === "" ? undefined : v;
}

export function num(formData: FormData, name: string, fallback = 0): number {
  const v = Number(formData.get(name));
  return Number.isFinite(v) ? v : fallback;
}

export function optNum(formData: FormData, name: string): number | undefined {
  const raw = formData.get(name);
  if (raw === null || raw === "") return undefined;
  const v = Number(raw);
  return Number.isFinite(v) ? v : undefined;
}

export function bool(formData: FormData, name: string): boolean {
  return formData.get(name) === "on";
}

/** Splits one item per line, dropping blanks — used for feature/body lists. */
export function lines(formData: FormData, name: string): string[] {
  return str(formData, name)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
