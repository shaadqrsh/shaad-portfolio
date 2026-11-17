"use client";
import { img } from "@/lib/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MobileNav from "./MobileNav";
import { TransitionLink } from "./PageTransition";
import { Socials, isActive, pages } from "./NavLinks";
import IconButton from "./ui/IconButton";
import { useSlidingPill } from "./ui/useSlidingPill";

/** Three bars that fold into an X while the menu is open. */
const MenuIcon = ({ open }: { open: boolean }) => (
  <span className="relative block h-3.5 w-5" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className={cn(
          "absolute inset-x-0 h-0.5 rounded-full bg-current transition-all duration-200 motion-reduce:transition-none",
          i === 0 && (open ? "top-1.5 rotate-45" : "top-0"),
          i === 1 && (open ? "top-1.5 opacity-0" : "top-1.5"),
          i === 2 && (open ? "top-1.5 -rotate-45" : "top-3")
        )}
      />
    ))}
  </span>
);

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  // The phone menu opens just under the navbar, so track the navbar's height.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const observer = new ResizeObserver(() => setNavHeight(nav.offsetHeight));
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  // The tab you just clicked. The pill moves to it straight away, while the
  // old page fades out, and the route catches up a moment later.
  const [clicked, setClicked] = useState<string | null>(null);
  const current = clicked ?? pathname;

  // Close the menu and forget the clicked tab once the route has changed.
  // Done while rendering, React's pattern for resetting state when a value changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setClicked(null);
  }

  // The red pill behind the active link, shared with the filter pills (see useSlidingPill).
  const activeLink = pages.find((p) => isActive(current, p.link))?.link ?? null;
  const { listRef, pillRef } = useSlidingPill<HTMLUListElement>(activeLink);

  return (
    <>
      <nav ref={navRef} className="sticky top-0 z-50 bg-shaad-200 text-white shadow-md">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5 px-8 py-3 max-[900px]:grid-cols-[1fr_auto] max-sm:px-4">
          <TransitionLink
            href="/home"
            onClick={() => pathname !== "/home" && setClicked("/home")}
            className="flex items-center gap-3 font-display text-[22px] font-bold tracking-[0.02em] whitespace-nowrap max-sm:text-[19px]"
          >
            <Image src={img("/icon")} alt="" width={46} height={46} className="size-[46px] max-sm:size-[38px]" priority />
            Shaad Qureshi
          </TransitionLink>

          {/* One red pill slides between the links as the page changes. */}
          <ul ref={listRef} className="group relative flex gap-1 rounded-full bg-shaad-300 p-[5px] max-[900px]:hidden">
            <span
              ref={pillRef}
              aria-hidden
              className="absolute top-[5px] bottom-[5px] left-0 rounded-full bg-shaad-600 opacity-0 shadow-md group-data-[ready]:opacity-100"
            />
            {pages.map(({ label, link, icon: Icon }) => {
              const active = isActive(current, link);
              return (
                <li key={link} data-pill-key={link} className="relative">
                  {active && (
                    <span aria-hidden className="absolute inset-0 rounded-full bg-shaad-600 shadow-md group-data-[ready]:hidden" />
                  )}
                  <TransitionLink
                    href={link}
                    onClick={() => !isActive(pathname, link) && setClicked(link)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-5 py-2 font-semibold transition-colors duration-200 max-[1150px]:px-4",
                      active ? "text-white" : "text-shaad-ink-2 hover:bg-shaad-tint hover:text-shaad-500"
                    )}
                  >
                    <Icon className="size-[18px]" aria-hidden />
                    {label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>

          <Socials className="justify-self-end max-[900px]:hidden" />

          <IconButton
            label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="justify-self-end min-[901px]:hidden"
          >
            <MenuIcon open={open} />
          </IconButton>
        </div>
      </nav>

      <MobileNav open={open} top={navHeight} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
