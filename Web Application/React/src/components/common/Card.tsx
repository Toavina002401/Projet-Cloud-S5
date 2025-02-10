import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg p-6 transition-all duration-300",
          {
            "bg-card text-card-foreground shadow hover:shadow-lg": variant === "default",
            "glass-card": variant === "glass",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export default Card;