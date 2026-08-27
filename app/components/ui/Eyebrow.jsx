import { cn } from "@/app/lib/utils";

/** Small mono label used for section eyebrows and inline tags. */
export function Eyebrow({ children, className, index }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-eyebrow uppercase text-ink-faint",
        className
      )}
    >
      {index ? <span className="text-accent">{index}</span> : null}
      <span className="h-px w-6 bg-line-bright" aria-hidden="true" />
      {children}
    </p>
  );
}
