"use client";
import { markNavigated } from "@/components/Loader";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Page transitions: every page change fades the old page out, then the new
 * one in. Links that go through TransitionLink play the fade out before
 * navigating; the browser's back and forward buttons only get the fade in.
 * Cards inside a page still fade up on their own as they scroll into view.
 */

let pending = false;
let leave: (() => Promise<void>) | null = null;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    markNavigated();
    pending = true;
  });
}

/** How the current page was entered: the first page of a visit, or from another page. */
export type PageEntry = "load" | "navigate";
const EntryContext = createContext<PageEntry>("load");
export const usePageEntry = () => useContext(EntryContext);

/** Fired as a page starts leaving, with the destination as its detail, so things outside the page can react early. */
export const PAGE_LEAVE = "page-leave";

/** Navigates with a transition: fades the current page out, then pushes. */
export const useTransitionNavigate = () => {
  const router = useRouter();
  return useCallback(
    async (href: string) => {
      markNavigated();
      pending = true;
      window.dispatchEvent(new CustomEvent(PAGE_LEAVE, { detail: href }));
      if (leave) await leave();
      router.push(href);
    },
    [router]
  );
};

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string; children: ReactNode };

/** A next/link that fades the page out first. New-tab clicks and modified clicks behave as normal links. */
export const TransitionLink = ({ href, onClick, target, ...props }: TransitionLinkProps) => {
  const navigate = useTransitionNavigate();
  const pathname = usePathname();
  return (
    <Link
      href={href}
      target={target}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        if (href === pathname) return;
        navigate(href);
      }}
      {...props}
    />
  );
};

/** Runs one page's fade in and fade out. Remounted for every path (see PageFrames). */
const PageFrame = ({ children }: { children: ReactNode }) => {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  // Read once, on mount: nothing pending means this is the first page of the visit.
  // The flag is only cleared in the effect below, because React can run this
  // initializer twice in development and the second run would see it cleared.
  const [entry] = useState<PageEntry>(() => (pending ? "navigate" : "load"));

  useEffect(() => {
    pending = false;
  }, []);

  useEffect(() => {
    leave = async () => {
      if (!reduce) await controls.start({ opacity: 0, transition: { duration: 0.1, ease: "easeIn" } });
    };
    controls.start({ opacity: 1, transition: { duration: reduce ? 0 : 0.2, ease: "easeOut" } });
    return () => {
      leave = null;
    };
  }, [controls, reduce]);

  return (
    <EntryContext.Provider value={entry}>
      <motion.div
        initial={entry === "load" || reduce ? false : { opacity: 0 }}
        animate={controls}
        className="flex w-full flex-1 items-start justify-center"
      >
        {children}
      </motion.div>
    </EntryContext.Provider>
  );
};

/**
 * Used by the (main) template. Keyed on the full path because a template only
 * remounts when its own segment changes: /projects and /projects/[project]
 * share one, so without the key a project page would stay faded out.
 */
export const PageFrames = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return <PageFrame key={pathname}>{children}</PageFrame>;
};
