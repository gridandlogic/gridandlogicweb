import { cn } from "@/app/lib/utils";

export function Card({ className, children, as: Component = "div", interactive = false, ...props }) {
  return (
    <Component
      className={cn(
        "relative rounded-card border border-line bg-surface",
        interactive &&
          "transition-colors duration-300 hover:border-line-bright hover:bg-panel",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
