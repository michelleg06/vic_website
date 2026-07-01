import { cn } from "@/lib/utils";

// Decorative "greca" band — a woven row of diamonds echoing the motif in the
// official VIC emblem ring and the program's activity posters. Ties the site's
// visual identity to the brand's intercultural roots.
export function Greca({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} role="presentation" aria-hidden>
      <svg width="100%" height="18" className="block">
        <defs>
          <pattern id="vic-greca" width="28" height="18" patternUnits="userSpaceOnUse">
            <rect width="28" height="18" fill="#5c3a1e" />
            {/* large diamond */}
            <path d="M14 1 L27 9 L14 17 L1 9 Z" fill="#f0523d" />
            {/* inner gold diamond */}
            <path d="M14 5 L21 9 L14 13 L7 9 Z" fill="#e0a92e" />
            {/* small connecting diamonds on the seams */}
            <path d="M0 9 L3 6.5 L6 9 L3 11.5 Z" fill="#e0a92e" />
            <path d="M28 9 L25 6.5 L22 9 L25 11.5 Z" fill="#e0a92e" />
          </pattern>
        </defs>
        <rect width="100%" height="18" fill="url(#vic-greca)" />
      </svg>
    </div>
  );
}
