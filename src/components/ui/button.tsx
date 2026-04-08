import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-700 text-white shadow hover:bg-emerald-800 active:scale-[0.98]",
        secondary:
          "bg-stone-100 text-stone-800 hover:bg-stone-200 active:scale-[0.98]",
        outline:
          "border border-emerald-700 text-emerald-700 bg-transparent hover:bg-emerald-50 active:scale-[0.98]",
        ghost:
          "text-stone-600 hover:bg-stone-100 hover:text-stone-800",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]",
        premium:
          "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:from-amber-600 hover:to-amber-700 active:scale-[0.98]",
        link: "text-emerald-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
