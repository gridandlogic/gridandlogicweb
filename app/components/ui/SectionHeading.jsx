import { cn } from "@/app/lib/utils";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { Reveal } from "@/app/components/ui/Reveal";

/**
 * Standard section header: mono eyebrow, headline, and optional lead paragraph
 * set beside it on wide screens.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "split",
  className,
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-14 lg:mb-20",
        centered
          ? "flex flex-col items-center text-center"
          : "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        className
      )}
    >
      <Reveal className={cn(centered && "flex flex-col items-center")}>
        {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
        <h2
          className={cn(
            "mt-5 max-w-xl text-h2 text-gradient-ink",
            centered && "mx-auto text-balance"
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal delay={0.08}>
          <p
            className={cn(
              "max-w-md text-[0.95rem] leading-relaxed text-ink-dim",
              centered ? "mx-auto mt-5 text-balance" : "lg:text-right"
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
