import { cn } from "@/lib/utils";
import React from "react";

/**
 * The site's card look: a bg-shaad-300 rounded panel with a small shadow that
 * deepens on hover. Exported so cards built from other elements match.
 */
export const cardClass = "rounded-xl bg-shaad-300 shadow-md transition-shadow duration-200 hover:shadow-xl";

/**
 * Hover for clickable cards and nav links: a faint red tint plus the card
 * shadow. It stays inside the element, so scroll areas can't clip it. Put
 * `group` on the element and `tintTitleClass` on its title to turn it red too.
 */
export const tintHoverClass = "transition-[background-color,box-shadow] duration-200 hover:bg-shaad-tint hover:shadow-xl";
export const tintTitleClass = "transition-colors duration-200 group-hover:text-shaad-500";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    cardClass, "p-4",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

export default Card;
