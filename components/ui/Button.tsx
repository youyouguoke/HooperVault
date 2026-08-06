"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C542] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B12] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#F5C542] text-[#0B0B12] hover:bg-[#F5C542]/90 active:scale-[0.98] shadow-[0_4px_14px_rgba(245,197,66,0.25)]",
        secondary:
          "bg-[#F57C00] text-white hover:bg-[#F57C00]/90 active:scale-[0.98] shadow-[0_4px_14px_rgba(245,124,0,0.25)]",
        outline:
          "border border-white/10 bg-transparent text-white hover:bg-white/5 hover:border-white/20",
        ghost: "text-white hover:bg-white/5",
        gold: "border border-[#F5C542] text-[#F5C542] bg-transparent hover:bg-[#F5C542]/10",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild, href, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

    if (asChild && href) {
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return (
      <button className={classes} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
