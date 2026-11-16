"use client";
import { name } from "@/lib/Data";
import { ArrowUp } from "lucide-react";

/** Copyright and a back to top button. Socials live in the navbar only. */
const Footer = () => {
  const year = new Date().getFullYear();

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="bg-shaad-200">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-8 py-5 text-sm text-shaad-ink-2 max-sm:px-4">
        <p>
          © {year - 1} to {year} {name}. All rights reserved.
        </p>
        <button
          type="button"
          onClick={toTop}
          className="inline-flex cursor-pointer items-center gap-1.5 font-semibold transition-colors hover:text-shaad-500"
        >
          Back to top <ArrowUp className="size-4" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
