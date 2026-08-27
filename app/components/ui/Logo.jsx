import Image from "next/image";
import { site } from "@/app/data/site";
import { cn } from "@/app/lib/utils";

/**
 * The logo file already carries the brand cyan (#00E6E6), so it needs no
 * recolouring — it is rendered as-is next to the wordmark. When the wordmark is
 * shown the mark is decorative; when it is hidden the mark carries the alt text.
 */
export function Logo({ className, showWordmark = true, size = 30 }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src={site.logo}
        alt={showWordmark ? "" : site.name}
        width={size}
        height={size}
        priority
        className="shrink-0"
      />
      {showWordmark ? (
        <span className="text-[1.02rem] font-semibold tracking-tight text-ink">
          Grid <span className="text-ink-faint">&amp;</span> Logic
        </span>
      ) : null}
    </span>
  );
}
