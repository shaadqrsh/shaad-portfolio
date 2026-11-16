"use client";
import { iconButtonClass } from "@/components/ui/IconButton";
import { getImgCount, projectImg } from "@/lib/images";
import { cn } from "@/lib/utils";
import { projectData } from "@/types";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  centerInScroller,
  MediaItem,
  slideTransition,
  slideVariants,
  useSwipe,
  ytEmbed,
  youtubeId,
  ytThumb,
} from "./media";
import MediaViewer, { PlayBadge, PreloadNeighbours } from "./MediaViewer";
import { Panel } from "./Panel";

// The site's shared solid red icon button; the arrows are a little larger.
const navBtn = cn(iconButtonClass, "absolute top-1/2 z-10 size-11 -translate-y-1/2 max-sm:size-9 [&_svg]:size-[22px]");

/**
 * Screenshots and videos in one tabbed panel: a large stage with the caption
 * under it and a row of thumbnails. The stage and the expand button open the
 * full-screen viewer.
 */
const MediaPanel = ({ project, url }: { project: projectData; url: string }) => {
  const imageCount = getImgCount(url);

  const images = useMemo(
    () =>
      Array.from({ length: imageCount }, (_, n) => ({
        kind: "image" as const,
        src: projectImg(url, `img_${n + 1}`),
        caption: project.captions[n] ?? "",
        n,
      })),
    [imageCount, url, project.captions]
  );
  const videos = useMemo(
    () =>
      project.videos.map((v, n) => ({
        kind: "video" as const,
        id: youtubeId(v.url),
        url: v.url,
        title: v.title,
        channel: v.channel,
        n,
      })),
    [project.videos]
  );
  const items: MediaItem[] = useMemo(() => [...images, ...videos], [images, videos]);

  const [tab, setTab] = useState<"shots" | "videos">(imageCount ? "shots" : "videos");
  const [shot, setShot] = useState(0);
  const [vid, setVid] = useState(0);
  const [playing, setPlaying] = useState(false);
  // Direction of the last screenshot change, so the stage slides the right way.
  const [shotDir, setShotDir] = useState(1);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  // Width / height of the first screenshot, read once it loads.
  const [ratio, setRatio] = useState(16 / 9);
  const portrait = ratio < 1;
  const reduce = !!useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);

  const goShot = (n: number, towards?: number) => {
    const target = (n + imageCount) % imageCount;
    if (target === shot) return;
    setShotDir(towards ?? (target > shot ? 1 : -1));
    setShot(target);
  };
  const { handlers, swiped } = useSwipe((d) => goShot(shot + d, d), tab !== "shots" || imageCount < 2);
  const openViewer = (i: number) => {
    setViewerIndex(i);
    setViewerOpen(true);
  };

  useEffect(() => {
    const active = rail.current?.querySelector<HTMLElement>("[aria-current='true']");
    if (active) centerInScroller(active, rail.current?.parentElement ?? null);
  }, [shot, vid, tab]);

  if (!imageCount && !videos.length) return null;

  const current = images[shot];
  const video = videos[vid];

  const tabs = (
    <div role="tablist" aria-label="Media type" className="flex gap-1 rounded-full bg-shaad-300 p-1">
      {imageCount > 0 && (
        <TabButton active={tab === "shots"} onClick={() => setTab("shots")} label="Screenshots" count={imageCount} />
      )}
      {videos.length > 0 && (
        <TabButton
          active={tab === "videos"}
          onClick={() => setTab("videos")}
          label={videos.length > 1 ? "Gameplay and Reviews" : "Gameplay"}
          count={videos.length}
        />
      )}
    </div>
  );

  return (
    <Panel title="Media" head={tabs}>
      {tab === "shots" && current ? (
        <>
          <div
            className={cn(
              "relative aspect-video max-h-[72vh] w-full touch-pan-y overflow-hidden rounded-2xl bg-shaad-300 max-sm:aspect-[4/3] max-sm:rounded-xl",
              portrait && "max-sm:aspect-[3/4]"
            )}
            {...handlers}
          >
            {/* The same picture, blurred, fills the letterbox around it. Crossfades between shots. */}
            <AnimatePresence initial={false}>
              <motion.div
                key={current.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt=""
                  aria-hidden
                  fill
                  sizes="200px"
                  className="scale-[1.2] object-cover blur-[28px] brightness-[.45] saturate-[1.2]"
                />
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              className="absolute inset-0 cursor-zoom-in overflow-hidden"
              aria-label={`View screenshot ${shot + 1} full screen`}
              onClick={() => !swiped.current && openViewer(shot)}
            >
              <AnimatePresence initial={false} custom={{ dir: shotDir, reduce }}>
                <motion.div
                  key={current.src}
                  custom={{ dir: shotDir, reduce }}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt={current.caption || `${project.title} screenshot ${shot + 1}`}
                    fill
                    draggable={false}
                    sizes="(min-width: 1400px) 1340px, 100vw"
                    className="select-none object-contain"
                    onLoad={(e) => {
                      if (current.n !== 0) return;
                      const img = e.currentTarget;
                      if (img.naturalHeight) setRatio(img.naturalWidth / img.naturalHeight);
                    }}
                  />
                </motion.div>
              </AnimatePresence>
              <PreloadNeighbours items={images} index={shot} sizes="(min-width: 1400px) 1340px, 100vw" blurSizes="200px" />
            </button>
            {imageCount > 1 && (
              <>
                <button type="button" className={cn(navBtn, "left-3.5 max-sm:left-2")} aria-label="Previous screenshot" onClick={() => goShot(shot - 1, -1)}>
                  <ChevronLeft className="size-[22px]" />
                </button>
                <button type="button" className={cn(navBtn, "right-3.5 max-sm:right-2")} aria-label="Next screenshot" onClick={() => goShot(shot + 1, 1)}>
                  <ChevronRight className="size-[22px]" />
                </button>
              </>
            )}
            <button
              type="button"
              className={cn(iconButtonClass, "absolute right-3 top-3 z-10 max-sm:right-2 max-sm:top-2 max-sm:size-9")}
              aria-label="View full screen"
              onClick={() => openViewer(shot)}
            >
              <Expand className="size-5" />
            </button>
          </div>

          <CaptionBar count={`${shot + 1} of ${imageCount}`}>
            <p className="text-shaad-ink">{current.caption}</p>
          </CaptionBar>

          {imageCount > 1 && (
            <div ref={rail} className="relative flex gap-2.5 overflow-x-auto px-0.5 pb-2 pt-0.5">
              {images.map((m) => (
                <button
                  key={m.src}
                  type="button"
                  aria-label={`Screenshot ${m.n + 1}`}
                  aria-current={m.n === shot}
                  onClick={() => goShot(m.n)}
                  style={{ aspectRatio: ratio }}
                  className={cn(
                    "relative h-[72px] shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent bg-shaad-300 opacity-55 transition hover:opacity-90 max-sm:h-[60px]",
                    m.n === shot && "border-shaad-600 opacity-100"
                  )}
                >
                  <Image src={m.src} alt="" fill sizes="160px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </>
      ) : video ? (
        <>
          <div className="relative aspect-video max-h-[72vh] w-full overflow-hidden rounded-2xl bg-shaad-300 max-sm:rounded-xl">
            {playing ? (
              <iframe
                key={video.id}
                src={ytEmbed(video.id)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            ) : (
              <button
                type="button"
                className="group/play absolute inset-0 cursor-pointer"
                aria-label={`Play ${video.title}`}
                onClick={() => setPlaying(true)}
              >
                <Image src={ytThumb(video.id)} alt="" fill unoptimized className="object-cover" />
                <PlayBadge />
              </button>
            )}
          </div>

          <CaptionBar count={`${vid + 1} of ${videos.length}`}>
            <p className="flex flex-col gap-0.5">
              <strong className="font-semibold text-white">{video.title}</strong>
              <span className="text-shaad-ink-3">{video.channel}</span>
            </p>
          </CaptionBar>

          {videos.length > 1 && (
            <div ref={rail} className="relative flex gap-2.5 overflow-x-auto px-0.5 pb-2 pt-0.5">
              {videos.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  aria-current={v.n === vid}
                  onClick={() => {
                    setVid(v.n);
                    setPlaying(false);
                  }}
                  className={cn(
                    "group/play flex w-[220px] shrink-0 cursor-pointer flex-col gap-2 rounded-xl border-2 border-transparent bg-shaad-300 p-1.5 text-left opacity-65 transition hover:opacity-100 max-sm:w-[180px]",
                    v.n === vid && "border-shaad-600 opacity-100"
                  )}
                >
                  <span className="relative block aspect-video overflow-hidden rounded-lg">
                    <Image src={ytThumb(v.id)} alt="" fill unoptimized className="object-cover" />
                    <PlayBadge small />
                  </span>
                  <span className="line-clamp-2 px-1 text-[13px] font-semibold leading-snug">{v.title}</span>
                  <span className="px-1 pb-0.5 text-xs text-shaad-ink-3">{v.channel}</span>
                </button>
              ))}
            </div>
          )}
        </>
      ) : null}

      <MediaViewer
        title={project.title}
        items={items}
        open={viewerOpen}
        index={viewerIndex}
        onIndexChange={setViewerIndex}
        onClose={() => setViewerOpen(false)}
        imageCount={imageCount}
        videoCount={videos.length}
        portrait={portrait}
      />
    </Panel>
  );
};

const TabButton = ({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={cn(
      "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-shaad-ink-2 transition-colors hover:text-white max-sm:px-3 max-sm:py-[7px]",
      active && "bg-shaad-600 text-white"
    )}
  >
    {label}
    <span className="ml-2 tabular-nums opacity-75">{count}</span>
  </button>
);

const CaptionBar = ({ count, children }: { count: string; children: ReactNode }) => (
  <div className="flex items-baseline gap-4 px-1 pb-3.5 pt-4 max-sm:gap-3 max-sm:px-0.5 max-sm:pb-3 max-sm:pt-3.5 max-sm:text-[15px] max-sm:leading-[1.6]">
    <span className="whitespace-nowrap text-sm font-semibold tabular-nums text-shaad-500">{count}</span>
    <div className="min-w-0">{children}</div>
  </div>
);

export default MediaPanel;
