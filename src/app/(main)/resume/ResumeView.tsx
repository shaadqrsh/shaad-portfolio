"use client";
import { useAppear } from "@/components/projects/Appear";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/IconButton";
import Meta, { Label } from "@/components/ui/Meta";
import { name } from "@/lib/Data";
import { formatDate } from "@/lib/dates";
import { EMAIL } from "@/lib/Email";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

// public/resume.png, rendered from the PDF by the resume generator at 250 dpi.
// It is shown at under half its size, so text stays sharp on high-density
// screens; next/image's resizing is skipped for the same reason.
const PAGE_W = 2066;
const PAGE_H = 2924;

/** An email address on one line, shrinking to fit its box, with a copy button. */
const CopyEmail = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked: select the address so it can be copied by hand.
      const text = e.currentTarget.previousElementSibling;
      if (text) window.getSelection()?.selectAllChildren(text);
    }
  };

  return (
    <div className="@container flex items-center gap-2 rounded-[10px] bg-shaad-300 py-1.5 pr-1.5 pl-3.5">
      {/* 24 monospace characters are about 14.6em wide; size the text so they fit beside the button. */}
      <span className="min-w-0 flex-1 font-label text-[min(16px,calc((100cqi_-_44px)/14.6))] whitespace-nowrap select-all">
        {EMAIL}
      </span>
      <IconButton small label={copied ? "Copied" : "Copy email"} onClick={copy}>
        {copied ? <Check /> : <Copy />}
      </IconButton>
    </div>
  );
};

const ResumeView = ({ updated }: { updated: string | null }) => (
  <section className="grid w-full max-w-[1400px] grid-cols-[minmax(0,1fr)_340px] items-start gap-8 px-8 py-8 text-white max-[1150px]:grid-cols-[minmax(0,1fr)_320px] max-[900px]:grid-cols-1 max-sm:px-4 max-sm:pb-14">
    <motion.div
      {...useAppear()}
      className="mx-auto w-full max-w-[900px] overflow-hidden rounded-md bg-white shadow-[0_30px_60px_-20px_#000c]"
    >
      <a href="/resume.pdf" target="_blank" rel="noopener" aria-label="Open the resume PDF">
        <Image
          src="/resume.png"
          alt={`${name}'s resume`}
          width={PAGE_W}
          height={PAGE_H}
          unoptimized
          priority
          className="h-auto w-full"
        />
      </a>
    </motion.div>

    <motion.aside
      {...useAppear(0.1)}
      className="sticky top-28 flex flex-col gap-[22px] rounded-4xl bg-shaad-200 p-8 shadow-2xl max-[900px]:static max-[900px]:order-first max-sm:rounded-3xl max-sm:p-5"
    >
      <h1 className="font-display text-[34px] leading-tight font-bold tracking-[-0.01em] text-shaad-600 max-sm:text-[26px]">
        Resume
      </h1>
      <div className="flex flex-col gap-2.5">
        <Button href="/resume.pdf" download={`${name} - Resume.pdf`}>
          <Download className="size-[18px]" />
          <span className="font-semibold">Download PDF</span>
        </Button>
        <Button href="/resume.pdf" target="_blank" rel="noopener" variant="tinted">
          <ExternalLink className="size-[18px]" />
          <span className="font-semibold">Open in a new tab</span>
        </Button>
      </div>
      {updated && <Meta items={[["Updated", formatDate(updated)]]} />}
      <div className="flex flex-col gap-2.5">
        <Label>Email</Label>
        <CopyEmail />
      </div>
    </motion.aside>
  </section>
);

export default ResumeView;
