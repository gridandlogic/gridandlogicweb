import { capabilities } from "@/app/data/site";

/**
 * Capability ticker. The track renders the list twice and translates by -50% so
 * the loop is seamless; CSS handles the motion, so this stays a server component.
 */
export function CapabilityStrip() {
  return (
    <section
      className="marquee-host relative border-y border-line bg-surface/60 py-5"
      aria-label="What we do"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent"
        aria-hidden="true"
      />

      <div className="flex overflow-hidden">
        <ul className="flex w-max shrink-0 animate-marquee items-center">
          {[...capabilities, ...capabilities].map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex items-center gap-8 whitespace-nowrap px-8 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint"
              aria-hidden={index >= capabilities.length ? "true" : undefined}
            >
              {item}
              <span className="text-accent/60" aria-hidden="true">
                /
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
