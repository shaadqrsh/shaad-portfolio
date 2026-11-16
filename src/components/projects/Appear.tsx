"use client";
import { HTMLMotionProps, motion, useInView, useReducedMotion } from "motion/react";
import { createContext, useContext, useRef } from "react";

/**
 * False while the page loader is still covering the page, so nothing plays its
 * entrance behind the loader. ProjectIdPage provides it.
 */
export const AppearReady = createContext(true);

const OFFSET = 12;

/**
 * The fade-up the rest of the site uses, but started by scrolling into view
 * rather than on mount, so cards further down animate when you reach them.
 */
export const useAppear = (delay = 0) => {
  const ref = useRef(null);
  const ready = useContext(AppearReady);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();
  const shown = ready && inView;

  return {
    ref,
    initial: reduce ? false : { opacity: 0, y: OFFSET },
    animate: reduce || shown ? { opacity: 1, y: 0 } : { opacity: 0, y: OFFSET },
    transition: { duration: 0.3, ease: "easeOut" as const, delay: shown ? delay : 0 },
  };
};

type AppearProps = HTMLMotionProps<"div"> & { delay?: number };

/** A div that fades up when it scrolls into view. */
export const Appear = ({ delay = 0, ...props }: AppearProps) => <motion.div {...useAppear(delay)} {...props} />;

/** Stagger step for items in a list, capped so long lists don't drag. */
export const stagger = (i: number) => Math.min(i, 5) * 0.04;
