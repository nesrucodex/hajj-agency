"use client";

import { motion } from "motion/react";
import { useSite } from "@/lib/locale";
import { IconWhatsapp, IconPhone } from "@/components/icons";

/**
 * Always-visible WhatsApp + Call shortcuts. In Ethiopia most enquiries come
 * through WhatsApp/phone, so keeping them one tap away lifts conversions.
 */
export default function FloatingContact() {
  const { t, locale, theme, toggleTheme } = useSite();
  const { brand } = t;
  const wa = brand.whatsapp.replace(/[^0-9]/g, "");
  const tel = brand.phone.replace(/[^0-9+]/g, "");
  const labels =
    locale === "am"
      ? { whatsapp: "ዋትስአፕ", call: "ይደውሉ", theme: "ገጽታ ይቀይሩ" }
      : { whatsapp: "WhatsApp", call: "Call us", theme: "Toggle theme" };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.95, type: "spring", stiffness: 300, damping: 20 }}
        onClick={toggleTheme}
        aria-label={labels.theme}
        className="group relative grid size-12 place-items-center rounded-full border border-gold-500/40 bg-emerald-950/85 text-gold-300 shadow-lg backdrop-blur transition-colors hover:border-gold-400"
      >
        {theme === "dark" ? (
          // sun (switch to light)
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          // moon (switch to dark)
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.5A8 8 0 1 1 10.2 4.3a6.3 6.3 0 0 0 9.8 10.2Z" />
          </svg>
        )}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-emerald-950 px-3 py-1.5 text-xs text-cream opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
          {labels.theme}
        </span>
      </motion.button>

      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 300, damping: 20 }}
        href={`https://wa.me/${wa}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.whatsapp}
        className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)]"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] [animation:pulse-ring_2.6s_ease-out_infinite]" />
        <IconWhatsapp className="relative size-7" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-emerald-950 px-3 py-1.5 text-xs text-cream opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
          {labels.whatsapp}
        </span>
      </motion.a>

      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.25, type: "spring", stiffness: 300, damping: 20 }}
        href={`tel:${tel}`}
        aria-label={labels.call}
        className="group relative grid size-14 place-items-center rounded-full bg-gradient-to-b from-gold-400 to-gold-700 text-emerald-950 shadow-[0_10px_30px_-8px_rgba(156,122,54,0.8)]"
      >
        <IconPhone className="size-6" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-emerald-950 px-3 py-1.5 text-xs text-cream opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
          {labels.call}
        </span>
      </motion.a>
    </div>
  );
}
