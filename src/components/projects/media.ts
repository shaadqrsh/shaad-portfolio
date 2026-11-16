import { PointerEvent, useRef } from "react";

export type MediaItem =
  | { kind: "image"; src: string; caption: string; n: number }
  | { kind: "video"; id: string; url: string; title: string; channel: string; n: number };

/** The video id from a youtube.com/watch?v=, youtu.be/ or /embed/ link. */
export const youtubeId = (url: string) => {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("youtu.be")) return u.pathname.slice(1);
    return u.searchParams.get("v") ?? u.pathname.split("/").pop() ?? "";
  } catch {
    return "";
  }
};

export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/**
 * Motion variants for moving between media. `custom` is the direction: 1 when
 * going forward (the new item comes in from the right), -1 going back.
 * Slides are absolutely positioned, so the old one leaves while the new one
 * arrives. With reduced motion only the opacity changes.
 */
export const slideVariants = {
  enter: ({ dir, reduce }: SlideCustom) => ({ x: reduce ? 0 : `${dir * 14}%`, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: ({ dir, reduce }: SlideCustom) => ({ x: reduce ? 0 : `${dir * -14}%`, opacity: 0 }),
};
export type SlideCustom = { dir: number; reduce: boolean };
export const slideTransition = {
  x: { duration: 0.22, ease: [0.32, 0.72, 0, 1] as const },
  opacity: { duration: 0.15 },
};

// youtube-nocookie keeps YouTube from setting tracking cookies until a video plays.
export const ytEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

/**
 * Scrolls the nearest scrollable ancestor of `el` (stopping at `stop`) so `el`
 * is centered horizontally, and brought into view vertically if it is out of
 * view. Only that container scrolls, never the page.
 */
export const centerInScroller = (el: HTMLElement, stop: HTMLElement | null, smooth = true) => {
  let c = el.parentElement;
  while (c && c !== stop) {
    const cs = getComputedStyle(c);
    if (/(auto|scroll)/.test(cs.overflowX + cs.overflowY)) break;
    c = c.parentElement;
  }
  if (!c || c === stop) return;
  const r = el.getBoundingClientRect();
  const cr = c.getBoundingClientRect();
  const left = c.scrollWidth > c.clientWidth ? r.left + r.width / 2 - (cr.left + cr.width / 2) : 0;
  const outOfView = r.top < cr.top || r.bottom > cr.bottom;
  const top = c.scrollHeight > c.clientHeight && outOfView ? r.top + r.height / 2 - (cr.top + cr.height / 2) : 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  c.scrollBy({ left, top, behavior: smooth && !reduce ? "smooth" : "auto" });
};

/**
 * Horizontal swipe detection with pointer events. `swiped.current` stays true
 * for a moment after a swipe so the click that follows it can be ignored.
 */
export const useSwipe = (onSwipe: (dir: 1 | -1) => void, disabled = false) => {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const handlers = {
    onPointerDown: (e: PointerEvent) => {
      start.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: (e: PointerEvent) => {
      const s = start.current;
      start.current = null;
      if (!s || disabled) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      swiped.current = true;
      setTimeout(() => {
        swiped.current = false;
      }, 60);
      onSwipe(dx < 0 ? 1 : -1);
    },
  };

  return { handlers, swiped };
};
