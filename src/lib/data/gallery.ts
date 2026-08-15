import "server-only";
import galleryData from "@/content/gallery.json";
import type { GalleryItem } from "@/lib/content";

type RawItem = { type: "image" | "video"; src: string; poster?: string };
const ITEMS = (galleryData as { items: RawItem[] }).items;

/**
 * The photo/video strip is static (agencies swap these rarely, and doing it
 * as a file edit is simpler than a dashboard for something photo-heavy) —
 * see `src/content/gallery.json`. Kept as an async function so callers
 * (`src/app/layout.tsx`) didn't need to change when this stopped being a
 * database query.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  return ITEMS.map((item, i) => ({
    id: String(i),
    type: item.type,
    src: item.src,
    poster: item.poster,
  }));
}
