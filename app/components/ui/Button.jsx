import { cva } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

/**
 * Renders an <a> when given `href`, otherwise a <button>. Every call site on the
 * site navigates (anchor, mailto, tel, or external), which keeps this a server
 * component with no click handlers.
 */
const buttonVariants = cva(
  "group inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-canvas hover:bg-white",
        outline: "border border-line-bright text-ink hover:border-accent hover:text-accent",
        ghost: "text-ink-dim hover:text-ink",
      },
      size: {
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-7 text-[0.95rem]",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export function Button({
  href,
  variant,
  size,
  className,
  children,
  external = false,
  ...props
}) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
