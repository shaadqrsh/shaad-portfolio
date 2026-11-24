"use client";
import { name } from "@/lib/Data";
import { copyrightYears, policyPages } from "@/lib/site";
import { ArrowUp } from "lucide-react";
import { TransitionLink } from "./PageTransition";

/** Copyright, the policy pages and a back to top button. Socials live in the navbar only. */
const Footer = () => {
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="bg-shaad-200">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-8 py-5 text-sm text-shaad-ink-2 max-sm:px-4">
        {/* Pages are built ahead of time, so in a new year the browser's year can
            differ from the build's for a while. That mismatch is expected. */}
        <p suppressHydrationWarning>
          © {copyrightYears()} {name}. All rights reserved.
        </p>
        <nav aria-label="Site policies" className="flex flex-wrap gap-x-5 gap-y-2">
          {policyPages.map(({ label, link }) => (
            <TransitionLink key={link} href={link} className="font-semibold transition-colors hover:text-shaad-500">
              {label}
            </TransitionLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={toTop}
          className="inline-flex cursor-pointer items-center gap-1.5 font-semibold transition-colors hover:text-shaad-500"
        >
          Back to top <ArrowUp className="size-4" aria-hidden />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
