"use client";
import { animate, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef } from "react";

/**
 * The navbar's sliding red pill, for any row of options. Put `listRef` on the
 * row, `pillRef` on one absolutely placed pill inside it, and
 * `data-pill-key` on each option. The pill moves with positions measured
 * inside the row, so scrolling or a parent animating can never throw it off;
 * it only slides when `activeKey` changes.
 *
 * Until it has been measured (the server HTML and the first paint), the row
 * has no `data-ready`, so callers draw a plain pill inside the active option
 * with `group-data-[ready]:hidden` and hide this one with
 * `opacity-0 group-data-[ready]:opacity-100`. A refresh never shows the row
 * without a pill.
 */
export const useSlidingPill = <L extends HTMLElement = HTMLElement>(activeKey: string | null) => {
  const reduce = useReducedMotion();
  const listRef = useRef<L>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const place = (slide: boolean) => {
      const target = activeKey === null ? null : list.querySelector<HTMLElement>(`[data-pill-key="${CSS.escape(activeKey)}"]`);
      pill.style.opacity = target ? "" : "0";
      if (!target) return;
      const to = { x: target.offsetLeft, width: target.offsetWidth };
      if (slide && !reduce) {
        animate(pill, to, { duration: 0.2, ease: [0.4, 0, 0.2, 1] });
        return;
      }
      // An instant animate() only lands on the next frame, which would leave one
      // frame without a pill. Write the styles now as well; Motion then matches them.
      pill.style.transform = `translateX(${to.x}px)`;
      pill.style.width = `${to.width}px`;
      animate(pill, to, { duration: 0 });
    };
    place(placed.current);
    placed.current = true;
    // Swap the stand-in for the measured pill; they sit in the same spot.
    list.dataset.ready = "true";
    // Fonts loading or the window resizing change the options' widths; follow without sliding.
    // A ResizeObserver also fires once as soon as it starts watching, which would cut
    // the slide short, so only react when the row's width really changes.
    let width = list.offsetWidth;
    const observer = new ResizeObserver(() => {
      if (list.offsetWidth === width) return;
      width = list.offsetWidth;
      place(false);
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeKey, reduce]);

  return { listRef, pillRef };
};
