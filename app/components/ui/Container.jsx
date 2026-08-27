import { cn } from "@/app/lib/utils";

export function Container({ className, children, as: Component = "div", ...props }) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
