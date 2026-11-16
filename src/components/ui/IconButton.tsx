import { cn } from "@/lib/utils";
import React from "react";

/**
 * The site's round icon button: a solid red circle like the main pill button,
 * lighter red and slightly larger on hover. Socials, the menu button and copy
 * buttons all use it. Exported so other components can apply it to their own
 * elements.
 */
export const iconButtonClass =
  "grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-shaad-600 text-white shadow-md transition duration-150 hover:scale-108 hover:bg-shaad-500 [&_svg]:size-[18px]";

/** Smaller variant for buttons that sit inside a field, like the copy button next to an email. */
export const iconButtonSmClass = "size-8 [&_svg]:size-4";

type Common = { label: string; small?: boolean; className?: string; children: React.ReactNode };
type AsLink = Common & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string };
type AsButton = Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { href?: undefined };

/** An icon-only link or button. `label` becomes its accessible name and tooltip. */
const IconButton = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, AsLink | AsButton>(
  ({ label, small, className, children, ...rest }, ref) => {
    const cls = cn(iconButtonClass, small && iconButtonSmClass, className);
    if (rest.href !== undefined) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-label={label}
          title={label}
          className={cls}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        aria-label={label}
        title={label}
        className={cls}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
