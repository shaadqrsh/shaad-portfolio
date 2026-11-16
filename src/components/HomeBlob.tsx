"use client";
import { usePageEntry } from "@/components/PageTransition";
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

// A smooth closed shape through seven points around the centre, in a 0 to 1
// box, each point at its own distance from the centre.
const N = 7;
const BASE = [0.45, 0.43, 0.47, 0.44, 0.46, 0.42, 0.45];
const PHASE = [0, 1.7, 3.1, 4.4, 0.9, 2.6, 5.2];

const blobPath = (t: number, scale = 1, amp = 0.035) => {
  const pts = BASE.map((base, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    const r = (base + amp * Math.sin(t * 0.55 + PHASE[i])) * scale;
    return [0.5 + r * Math.cos(a), 0.5 + r * Math.sin(a)];
  });
  const P = (i: number) => pts[(i + N) % N];
  const f = (n: number) => n.toFixed(4);
  let d = `M${f(P(0)[0])},${f(P(0)[1])}`;
  // Catmull-Rom through the points, written as cubic Beziers.
  for (let i = 0; i < N; i++) {
    const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
  }
  return `${d} Z`;
};

// The shapes never change; only their layers rotate, which the browser does
// on the GPU without repainting, so the page scrolls smoothly.
const SHAPE = blobPath(0, 1, 0);
const RING_1 = blobPath(2, 1.07, 0.03);
const RING_2 = blobPath(4, 1.14, 0.03);
// The photo is cut to a circle that stays inside the blob at every angle (the
// blob's nearest edge is 0.42 from the centre), so the blob can turn behind it.
const PHOTO_R = 0.415;

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
          <path d={SHAPE} fill="#d84b54" />
        </svg>
      </div>
      <div aria-hidden className={`${spin} animate-[spin_36s_linear_infinite_reverse]`}>
        <svg viewBox="0 0 1 1" className="size-full overflow-visible">
          <path d={RING_1} fill="none" stroke="#ec5f68" strokeWidth={0.012} opacity={0.9} />
        </svg>
      </div>
      <div aria-hidden className={`${spin} animate-[spin_26s_linear_infinite]`}>
        <svg viewBox="0 0 1 1" className="size-full overflow-visible">
          <path d={RING_2} fill="none" stroke="#ec5f68" strokeWidth={0.006} opacity={0.5} />
        </svg>
      </div>
      <svg viewBox="0 0 1 1" aria-hidden className="absolute inset-0 size-full">
        <defs>
          <clipPath id={clipId}>
            <circle cx={0.5} cy={0.5} r={PHOTO_R} />
          </clipPath>
        </defs>
        <image href={src} x={0} y={0} width={1} height={1} preserveAspectRatio="xMidYMin slice" clipPath={`url(#${clipId})`} />
      </svg>
    </motion.div>
  );
};

export default HomeBlob;
