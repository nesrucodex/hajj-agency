"use client";

import { StarMark } from "./icons";

/**
 * A reusable mosque-style arched frame. Instead of an SVG clip-path (which
 * distorts with aspect ratio), it uses a domed border-radius — a clean mihrab
 * arch — with a gold border, a hairline echo, and a small star "finial"
 * crowning the apex. Renders identically at any size.
 *
 * Used by the hero and About imagery so they share one distinctive form.
 */

// No longer needs a shared SVG clip; kept as a no-op for API compatibility.
export function MosqueClipDefs() {
  return null;
}

export function MosqueFrame({
  children,
  className = "",
  outline = true,
}: {
  children: React.ReactNode;
  className?: string;
  outline?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* arched media (50% top radii → the dome meets smoothly at the apex) */}
      <div className="absolute inset-0 overflow-hidden rounded-[50%_50%_1.5rem_1.5rem] border border-gold-400/50">
        {children}
      </div>

      {outline && (
        <>
          {/* inner hairline echoing the arch */}
          <div className="pointer-events-none absolute inset-[6px] rounded-[50%_50%_1rem_1rem] border border-gold-400/25" />
          {/* finial crowning the apex */}
          <span className="absolute left-1/2 top-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
            <span className="grid size-9 place-items-center rounded-full border border-gold-400/50 bg-emerald-950 text-gold-400 shadow-lg">
              <StarMark className="size-5" />
            </span>
          </span>
        </>
      )}
    </div>
  );
}

export default MosqueFrame;
