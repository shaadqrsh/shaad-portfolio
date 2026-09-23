"use client";
import { Jam, Jams as jamsData } from "@/lib/Jams";
import FadeInUp from "@/components/FadeInUp";
import Card from "@/components/ui/Card";
import AboutCard from "../AboutCard";
import DateDisplay from "../DateDisplay";
import useManualCols from "@/hooks/useManualCols";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface JamsProps {
  enableAnimation?: boolean;
}

// Square PNG logo for the event. Falls back to a trophy tile until the file exists.
const JamIcon = ({ src, alt }: { src: string; alt: string }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-shaad-200 flex items-center justify-center">
      {src && !imgError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="48px"
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <Trophy className="w-6 h-6 text-shaad-600" />
      )}
    </div>
  );
};

const JamCard = ({ jam }: { jam: Jam }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // A portfolio project page wins over an external link.
  const href = jam.project ? `/projects/${jam.project}` : jam.url;

  return (
    <Card
      className="cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_20px_var(--color-shaad-600)]"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-4 pr-8 relative">
        <JamIcon src={jam.icon} alt={jam.title} />
        <div>
          <h2 className="text-lg font-semibold text-white leading-tight">{jam.title}</h2>
          <DateDisplay date={jam.date} className="text-sm text-shaad-500" />
        </div>
        <ChevronDown
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 text-shaad-600 transition-transform duration-500",
            isExpanded ? "rotate-180" : "rotate-0"
          )}
          size={22}
        />
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3">
              {jam.bullets.map((b, i) => (
                <div className="text-sm mt-1 flex items-start text-white" key={i}>
                  <span className="mr-2">•</span>
                  <span>{b}</span>
                </div>
              ))}

              {href && (
                <Link
                  href={href}
                  target={jam.project ? undefined : "_blank"}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-shaad-600 hover:text-shaad-500"
                >
                  {jam.project ? "View project" : "Visit"}
                  <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const Jams = ({ enableAnimation = true }: JamsProps) => {
  const cols = useManualCols(2, 1);

  if (jamsData.length === 0) return null;

  return (
    <AboutCard title="Game Jams & Hackathons">
      {/* items-start so opening one card doesn't stretch its row neighbour */}
      <div className="gap-4 mt-4 lg:grid lg:grid-cols-2 lg:items-start flex flex-col">
        {jamsData.map((jam, idx) => (
          <FadeInUp key={idx} enableAnimation={enableAnimation} delay={0.1 * (idx % cols)}>
            <JamCard jam={jam} />
          </FadeInUp>
        ))}
      </div>
    </AboutCard>
  );
};

export default Jams;
