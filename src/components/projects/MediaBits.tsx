"use client";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import { Fragment, useSyncExternalStore } from "react";

const noop = () => () => {};
/** False during the server render and hydration, true once the page is live. */
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

// Small pieces shared by the media panel and the full-screen viewer. They live
// apart from MediaViewer so the panel can load the viewer only when it opens.

/**
 * Loads the screenshots either side of the current one, at the same sizes the
 * stage asks for, in an invisible layer. By the time you swipe, the next image
 * is already downloaded, so it slides in whole instead of popping in halfway.
 * Rendered only after hydration: in the server HTML, React would turn these
 * hidden images into preload hints the browser warns are unused.
 */
export const PreloadNeighbours = ({
  items,
  index,
  sizes,
  blurSizes,
}: {
  items: { src: string }[];
  index: number;
  sizes: string;
  /** Also warm the blurred backdrop copy, which the page stage draws at a small size. */
  blurSizes?: string;
}) => {
  const mounted = useMounted();
  const n = items.length;
  if (n < 2 || !mounted) return null;
  const seen = new Set([items[index]?.src]);
  const near = [items[(index + 1) % n], items[(index - 1 + n) % n]].filter((m) => m?.src && !seen.has(m.src) && seen.add(m.src));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0">
      {near.map((m) => (
        <Fragment key={m.src}>
          <Image src={m.src} alt="" fill sizes={sizes} loading="eager" className="object-contain" />
          {blurSizes && <Image src={m.src} alt="" fill sizes={blurSizes} loading="eager" className="object-cover" />}
        </Fragment>
      ))}
    </div>
  );
};

export const PlayBadge = ({ small }: { small?: boolean }) => (
  <span
    className={cn(
      "absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-shaad-fill shadow-[0_8px_24px_#0009] transition-transform group-hover/play:scale-110",
      small ? "size-[26px]" : "size-[68px]"
    )}
  >
    <Play className={cn("fill-current text-white", small ? "ml-px size-3" : "ml-1 size-7")} />
  </span>
);

