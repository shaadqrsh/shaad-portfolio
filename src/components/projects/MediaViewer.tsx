"use client";
import { buttonVariants } from "@/components/ui/button";
import { cardArrowClass } from "@/components/ui/Card";
import { iconButtonClass } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X, ZoomIn, ZoomOut } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  centerInScroller,
  MediaItem,
  slideTransition,
  slideVariants,
  useSwipe,
  ytEmbed,
  ytThumb,
} from "./media";
import { Label } from "./Panel";

const ZOOM = 1.5;

/** Anything with pointer coordinates: a click, a pointer move. */
type Point = { clientX: number; clientY: number };

interface MediaViewerProps {
  title: string;
  items: MediaItem[];
  open: boolean;
  /** The item shown. Kept while closing so the exit animation shows the same item. */
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  imageCount: number;
  videoCount: number;
  portrait: boolean;
}

// The site's shared solid red icon button; the arrows are a little larger.
const iconBtn = iconButtonClass;
const navBtn = cn(iconButtonClass, "absolute top-1/2 z-10 size-11 -translate-y-1/2 max-[899px]:size-[38px] [&_svg]:size-[22px]");

const keyOf = (m: MediaItem) => (m.kind === "image" ? m.src : m.id);

/**
 * Full-screen viewer for screenshots and videos. Each picture sits in an
 * absolutely sized box with object-fit: contain, so it always fits and stays
 * centered whatever the window's shape. Moving between items slides in the
 * direction of travel. Desktop has a side panel; below 900px the panel becomes
 * a sheet along the bottom.
 */
const MediaViewer = ({
  title,
  items,
  open,
  index,
  onIndexChange,
  onClose,
  imageCount,
  videoCount,
  portrait,
}: MediaViewerProps) => {
  const [zoomed, setZoomed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [dir, setDir] = useState(1);
  const reduce = !!useReducedMotion();
  const zoomBox = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);

  const i = Math.min(index, items.length - 1);
  const item = items[i];

  /** Show item `next`. `towards` is the direction of travel; by default it follows the index. */
  const go = (next: number, towards?: number) => {
    const target = (next + items.length) % items.length;
    if (target === i) return;
    setDir(towards ?? (target > i ? 1 : -1));
    setZoomed(false);
    setPlaying(false);
    onIndexChange(target);
  };
  const step = (d: 1 | -1) => go(i + d, d);
  const { handlers, swiped } = useSwipe(step, zoomed);

  useEffect(() => {
    if (!open) return;
    const active = thumbs.current?.querySelector<HTMLElement>("[aria-current='true']");
    if (active) centerInScroller(active, thumbs.current?.parentElement ?? null);
  }, [open, i]);

  const setOrigin = (e: Point) => {
    const box = zoomBox.current;
    if (!box) return;
    const r = box.parentElement!.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100));
    box.style.transformOrigin = `${x}% ${y}%`;
  };

  const toggleZoom = (e?: Point) => {
    if (item?.kind !== "image") return;
    if (!zoomed && e) setOrigin(e);
    if (zoomed && zoomBox.current) zoomBox.current.style.transformOrigin = "50% 50%";
    setZoomed(!zoomed);
  };

  const close = () => {
    setZoomed(false);
    setPlaying(false);
    onClose();
  };

  if (!item) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && close()}>
      <DialogPrimitive.Portal>
        {/* Timing matches the mobile nav sheet: 0.18s backdrop fade, 0.26s panel slide on cubic-bezier(.2,.8,.2,1). */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-shaad-void duration-[180ms] ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          // No keyboard shortcuts on this site: Esc doesn't close the viewer either.
          onEscapeKeyDown={(e) => e.preventDefault()}
          className="group fixed inset-0 z-[60] grid grid-rows-[minmax(0,1fr)_auto] overflow-hidden text-white outline-none duration-[260ms] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none min-[900px]:grid-cols-[minmax(0,1fr)_360px] min-[900px]:grid-rows-1"
        >
          <DialogPrimitive.Title className="sr-only">{title} media viewer</DialogPrimitive.Title>

          {/* Stage: grows into place on open */}
          <div
            className={cn(
              "relative min-h-0 overflow-hidden duration-[260ms] ease-[cubic-bezier(.2,.8,.2,1)] group-data-[state=closed]:animate-out group-data-[state=closed]:zoom-out-95 group-data-[state=open]:animate-in group-data-[state=open]:zoom-in-95 motion-reduce:animate-none",
              zoomed ? "touch-none" : "touch-pan-y"
            )}
            {...handlers}
          >
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2.5">
              <span className="rounded-full bg-shaad-300 px-3.5 py-2 text-sm font-semibold tabular-nums text-shaad-ink-2 shadow-md">
                {i + 1} of {items.length}
              </span>
              {item.kind === "image" && (
                <button
                  type="button"
                  className={iconBtn}
                  aria-label={zoomed ? "Zoom out" : "Zoom in"}
                  onClick={() => toggleZoom()}
                >
                  {zoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
                </button>
              )}
            </div>
            {/* On phones the sheet has no close button, like the nav sheet, so it sits on the stage. */}
            <DialogPrimitive.Close
              className={cn(iconBtn, "absolute right-4 top-4 z-10 min-[900px]:hidden")}
              aria-label="Close"
            >
              <X className="size-5" />
            </DialogPrimitive.Close>

            <div className="absolute inset-x-3 bottom-3 top-[68px] overflow-hidden [container-type:size] min-[900px]:inset-x-[76px] min-[900px]:bottom-6 min-[900px]:top-[72px]">
              <AnimatePresence initial={false} custom={{ dir, reduce }}>
                {/* Keyed per item, so an image never reuses a video's element and its centering transform. */}
                <motion.div
                  key={keyOf(item)}
                  custom={{ dir, reduce }}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                  className="absolute inset-0"
                >
                  {item.kind === "image" ? (
                    <div
                      // Only take new nodes: the outgoing slide unmounting would otherwise clear the ref.
                      ref={(node) => {
                        if (node) zoomBox.current = node;
                      }}
                      className={cn(
                        "absolute inset-0 transition-transform duration-[180ms] ease-out motion-reduce:transition-none",
                        zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                      )}
                      style={{ transform: zoomed ? `scale(${ZOOM})` : undefined }}
                      onClick={(e) => !swiped.current && toggleZoom(e)}
                      onPointerMove={(e) => zoomed && setOrigin(e)}
                    >
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        sizes="100vw"
                        draggable={false}
                        className="select-none object-contain"
                      />
                    </div>
                  ) : (
                    <div className="absolute left-1/2 top-1/2 aspect-video w-[min(100cqw,calc(100cqh*16/9))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-shaad-300">
                      {playing ? (
                        <iframe
                          src={ytEmbed(item.id)}
                          title={item.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="size-full"
                        />
                      ) : (
                        <button
                          type="button"
                          className="group/play relative size-full cursor-pointer"
                          aria-label={`Play ${item.title}`}
                          onClick={() => !swiped.current && setPlaying(true)}
                        >
                          <Image src={ytThumb(item.id)} alt="" fill unoptimized className="object-cover" />
                          <PlayBadge />
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              <PreloadNeighbours items={items.map((m) => (m.kind === "image" ? m : { src: "" }))} index={i} sizes="100vw" />
            </div>

            {items.length > 1 && (
              <>
                <button type="button" className={cn(navBtn, "left-3.5 max-[899px]:left-2")} aria-label="Previous" onClick={() => step(-1)}>
                  <ChevronLeft className="size-[22px]" />
                </button>
                <button type="button" className={cn(navBtn, "right-3.5 max-[899px]:right-2")} aria-label="Next" onClick={() => step(1)}>
                  <ChevronRight className="size-[22px]" />
                </button>
              </>
            )}
          </div>

          {/* Side panel slides in from the right. On phones it's a bottom sheet styled and
              animated like the mobile nav sheet: rounded 24px top, shadow above, rising straight up.
              The sideways slide is desktop-only so the two don't combine into a diagonal. */}
          <aside className="flex min-h-0 flex-col gap-5 overflow-y-auto rounded-l-4xl bg-shaad-200 p-6 duration-[260ms] ease-[cubic-bezier(.2,.8,.2,1)] group-data-[state=closed]:animate-out group-data-[state=open]:animate-in min-[900px]:group-data-[state=closed]:slide-out-to-right min-[900px]:group-data-[state=open]:slide-in-from-right motion-reduce:animate-none max-[899px]:max-h-[46dvh] max-[899px]:gap-6 max-[899px]:rounded-tl-[24px] max-[899px]:rounded-tr-[24px] max-[899px]:rounded-bl-none max-[899px]:px-[max(20px,env(safe-area-inset-left,0px))] max-[899px]:pb-[calc(env(safe-area-inset-bottom,0px)+24px)] max-[899px]:pt-6 max-[899px]:shadow-[0_-20px_40px_#00000088] max-[899px]:group-data-[state=closed]:slide-out-to-bottom max-[899px]:group-data-[state=open]:slide-in-from-bottom">
            <div className="flex flex-col gap-2.5">
              <div className="flex min-h-10 items-center justify-between gap-3">
                <Label>
                  {item.kind === "image" ? `Screenshot ${item.n + 1} of ${imageCount}` : `Video ${item.n + 1} of ${videoCount}`}
                </Label>
                <DialogPrimitive.Close className={cn(iconBtn, "max-[899px]:hidden")} aria-label="Close">
                  <X className="size-5" />
                </DialogPrimitive.Close>
              </div>

              <h2 className="text-lg font-semibold leading-normal max-[899px]:text-base">
                {item.kind === "image" ? item.caption : item.title}
              </h2>
              {item.kind === "video" && (
                <>
                  <p className="text-shaad-ink-3">{item.channel}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "tinted", size: "sm" }), "group self-start font-semibold")}
                  >
                    Watch on YouTube <ArrowUpRight className={cn(cardArrowClass, "size-4 text-current")} aria-hidden />
                  </a>
                </>
              )}
            </div>

            {items.length > 1 && (
              <div className="flex min-w-0 flex-col gap-2.5">
                <Label>All media</Label>
                <div
                  ref={thumbs}
                  className="relative grid grid-cols-3 gap-2 max-[899px]:flex max-[899px]:overflow-x-auto max-[899px]:pb-2"
                >
                  {items.map((m, j) => (
                    <button
                      key={keyOf(m)}
                      type="button"
                      aria-label={m.kind === "image" ? `Screenshot ${m.n + 1}` : `Video ${m.n + 1}`}
                      aria-current={j === i}
                      onClick={() => go(j)}
                      className={cn(
                        "group/play relative w-full shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent bg-shaad-300 opacity-55 transition hover:opacity-90 max-[899px]:h-[60px] max-[899px]:w-auto",
                        portrait ? "aspect-[3/5]" : "aspect-[16/10]",
                        j === i && "border-shaad-600 opacity-100"
                      )}
                    >
                      <Image
                        src={m.kind === "image" ? m.src : ytThumb(m.id)}
                        alt=""
                        fill
                        sizes="120px"
                        unoptimized={m.kind === "video"}
                        className="object-cover"
                      />
                      {m.kind === "video" && <PlayBadge small />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

/**
 * Loads the screenshots either side of the current one, at the same sizes the
 * stage asks for, in an invisible layer. By the time you swipe, the next image
 * is already downloaded, so it slides in whole instead of popping in halfway.
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
  const n = items.length;
  if (n < 2) return null;
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
      "absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-shaad-600 shadow-[0_8px_24px_#0009] transition-transform group-hover/play:scale-110",
      small ? "size-[26px]" : "size-[68px]"
    )}
  >
    <Play className={cn("fill-current text-white", small ? "ml-px size-3" : "ml-1 size-7")} />
  </span>
);

export default MediaViewer;
