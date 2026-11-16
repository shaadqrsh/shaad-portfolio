"use client";
import { usePageEntry } from "@/components/PageTransition";
import { BLOB_RING_1, BLOB_RING_2, BLOB_SHAPE } from "@/lib/blob";
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

// The shapes never change; only their layers rotate, which the browser does
// on the GPU without repainting, so the page scrolls smoothly.
const spin = "absolute inset-0 will-change-transform motion-reduce:animate-none";

/**
 * The home photo on a red blob that slowly turns, with two thin red rings
 * orbiting it in opposite directions and a pulsing glow behind. It zooms in on
 * the first page of a visit and fades in when you arrive from another page.
 * Still for anyone who prefers reduced motion.
 */
const HomeBlob = ({ src, alt, ready }: { src: string; alt: string; ready: boolean }) => {
  const reduce = useReducedMotion();
  const entry = usePageEntry();
  const clipId = useId().replace(/:/g, "");

  // First page of a visit: zoom in. Arriving from another page: fade in, like the page around it.
  const hidden = entry === "load" ? { opacity: 0, scale: 0.8 } : { opacity: 0 };
  const shown = { opacity: 1, scale: 1 };

  return (
    <motion.div
      role="img"
      aria-label={alt}
      initial={reduce ? false : hidden}
      animate={ready || reduce ? shown : hidden}
      transition={{ duration: entry === "load" ? 0.45 : 0.3, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
      className="relative aspect-square w-full max-w-[460px] justify-self-center max-[900px]:order-first max-[900px]:max-w-[300px]"
    >
      {/* Glow: a soft red disc whose opacity pulses. */}
      <div aria-hidden className="absolute inset-[4%] animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-shaad-600/80 blur-[36px] motion-reduce:animate-none" />
      <div aria-hidden className={`${spin} animate-[spin_60s_linear_infinite]`}>
        <svg viewBox="0 0 1 1" className="size-full overflow-visible">
          <defs>
            {/* objectBoundingBox, so the 0 to 1 blob path scales to whatever element it clips. */}
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d={BLOB_SHAPE} />
            </clipPath>
          </defs>
          <path d={BLOB_SHAPE} fill="#d84b54" />
        </svg>
      </div>
      <div aria-hidden className={`${spin} animate-[spin_36s_linear_infinite_reverse]`}>
        <svg viewBox="0 0 1 1" className="size-full overflow-visible">
          <path d={BLOB_RING_1} fill="none" stroke="#ec5f68" strokeWidth={0.012} opacity={0.9} />
        </svg>
      </div>
      <div aria-hidden className={`${spin} animate-[spin_26s_linear_infinite]`}>
        <svg viewBox="0 0 1 1" className="size-full overflow-visible">
          <path d={BLOB_RING_2} fill="none" stroke="#ec5f68" strokeWidth={0.006} opacity={0.5} />
        </svg>
      </div>
      {/* The photo, cut to the blob's own shape so it reaches the blob's edge.
          This layer turns with the blob, carrying the cut with it, and the
          photo inside turns back the other way at the same speed, so it
          stays upright while its edge follows the blob. */}
      <div aria-hidden className={`${spin} animate-[spin_60s_linear_infinite]`} style={{ clipPath: `url(#${clipId})` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- preloaded by the home page, which waits on it */}
        <img src={src} alt="" draggable={false} className={`${spin} size-full animate-[spin_60s_linear_infinite_reverse] object-cover object-top`} />
      </div>
    </motion.div>
  );
};

export default HomeBlob;
