import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "sm" | "default" | "lg";
  asChild?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp
      className={cn(
        "inline-flex select-none items-center justify-center rounded-full font-medium tracking-tight transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        variant === "default" &&
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_8px_20px_-12px_rgba(163,23,46,0.5)] hover:bg-primary/90 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_10px_24px_-10px_rgba(163,23,46,0.55)]",
        variant === "outline" &&
          "border border-border bg-background shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--foreground)_4%,transparent)] hover:border-foreground/20 hover:bg-muted/60",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] hover:bg-secondary/75",
        variant === "ghost" && "hover:bg-muted/70",
        size === "sm" && "h-8 px-4 text-xs",
        size === "default" && "h-10 px-5 text-sm",
        size === "lg" && "h-12 px-8 text-base",
        className,
      )}
      {...props}
    />
  );
}
export { Button };
