import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = { robots: { index: false } };

// The admin dashboard is deliberately a plain, clean shadcn UI — visually
// distinct from the "Sacred Luxury" marketing site. `.admin-shell` scopes
// shadcn's neutral --background/--foreground tokens (see globals.css) so
// they never leak onto the public pages; `font-sans` picks up the Geist
// font already loaded on <html> by the root layout.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell min-h-screen bg-background font-sans text-foreground">
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  );
}
