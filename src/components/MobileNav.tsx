"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Socials, isActive, pages } from "./NavLinks";
import { TransitionLink } from "./PageTransition";

interface MobileNavProps {
  open: boolean;
  /** Distance from the top of the screen to the navbar's bottom edge. */
  top: number;
  onClose: () => void;
}

const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Phone menu: a sheet that rises from the bottom over a dimmed page. */
const MobileNav = ({ open, top, onClose }: MobileNavProps) => {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    // Locking the page's scroll removes its scrollbar; pad the page by the
    // scrollbar's width so nothing shifts sideways while the menu is open.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    // The menu only exists on narrow screens; close it if the window widens.
    const onResize = () => window.innerWidth > 900 && onClose();
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 z-40 overflow-hidden" style={{ top }}>
          <motion.div
            className="absolute inset-0 bg-[#0c0a17cc]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: "easeOut" }}
          />
          <motion.nav
            aria-label="Pages"
            className="absolute inset-x-0 bottom-0 flex max-h-full flex-col gap-6 overflow-y-auto rounded-t-3xl bg-shaad-200 px-[max(20px,env(safe-area-inset-left))] pt-6 pb-[calc(env(safe-area-inset-bottom)+24px)] text-white shadow-[0_-20px_40px_#00000088]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: reduce ? 0 : 0.26, ease: EASE }}
          >
            <ul className="flex flex-col gap-1.5">
              {pages.map(({ label, link, icon: Icon }) => {
                const active = isActive(pathname, link);
                return (
                  <li key={link}>
                    <TransitionLink
                      href={link}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3.5 rounded-[14px] px-4 py-2.5 font-display text-[28px] font-bold transition-colors duration-200",
                        active ? "bg-shaad-600 text-white" : "text-shaad-ink-2 hover:bg-shaad-tint hover:text-shaad-500"
                      )}
                    >
                      <Icon className="size-[26px] shrink-0" aria-hidden />
                      {label}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
            <Socials />
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
