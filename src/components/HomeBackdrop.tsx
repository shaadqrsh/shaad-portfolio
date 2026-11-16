"use client";
import { PAGE_LEAVE } from "@/components/PageTransition";
import { img } from "@/lib/images";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BG_IMG = img("/bg_home");

/**
 * The doodle pattern behind the home page. It lives in the layout rather than
 * the page, so it isn't caught up in the page's own fade: it starts fading out
 * the moment you leave home, and back in when you return.
 */
const HomeBackdrop = () => {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  // Forget a leave once the route actually changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setLeaving(false);
  }

  useEffect(() => {
    const onLeave = (e: Event) => setLeaving((e as CustomEvent<string>).detail !== "/home");
    window.addEventListener(PAGE_LEAVE, onLeave);
    return () => window.removeEventListener(PAGE_LEAVE, onLeave);
  }, []);

  const show = pathname === "/home" && !leaving;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="home-backdrop"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 will-change-[opacity]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
          style={{
            backgroundImage: `url('${BG_IMG}')`,
            backgroundRepeat: "repeat",
            backgroundSize: "1440px",
            filter: "blur(2px) brightness(0.4)",
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default HomeBackdrop;
