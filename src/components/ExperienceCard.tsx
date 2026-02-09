import { cn } from "@/lib/utils";
import Image from "next/image";
import Card from "@/components/ui/Card";
import DateDisplay from "./DateDisplay";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { ReactNode, useState } from "react";

interface ExperienceCardProps {
  date?: string;
  endDate?: string;
  title: string;
  subTitle?: string | string[] | ReactNode;
  img?: string;
  ex?: boolean;
  inProgress?: boolean;
  location?: string;
  url?: string;
}

const ExperienceCard = ({
  date,
  endDate,
  subTitle,
  title,
  img,
  ex = true,
  inProgress = false,
  location,
  url,
}: ExperienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (ex) {
      setIsExpanded(!isExpanded);
    } else if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="relative flex items-start space-x-4">
      {ex && (
        <div
          className={cn(
            "w-3 h-3 rounded-full z-10 relative -left-[6.5px] self-center border-2 border-shaad-600",
            inProgress
              ? "bg-shaad-200"
              : "bg-shaad-600"
          )}
        ></div>
      )}

      <Card
        className={cn(
          "w-full flex lg:flex-row flex-col items-center relative transition-shadow duration-300",
          !ex && "min-h-[108px] items-start",
          (ex || url) &&
          "cursor-pointer hover:shadow-[0_0_20px_var(--color-shaad-600)]"
        )}
        onClick={handleClick}
      >
        {img && ex && (
          <Image
            src={img}
            width={100}
            height={100}
            alt={title}
            className="lg:mr-4 max-lg:mb-2 rounded-lg"
          />
        )}

        <div className="w-full">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              {ex && (
                <div className="text-md text-shaad-500 mb-1 mt-0 block">
                  {location && <span>{location} &#8226; </span>}
                  {date && (
                    <DateDisplay
                      date={date}
                      endDate={endDate}
                      inProgress={inProgress}
                      className=""
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {ex && (
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-2">
                    {subTitle &&
                      (Array.isArray(subTitle) ? (
                        subTitle.map((sub, idx) => (
                          <div
                            className={cn(
                              `text-sm mt-1 flex items-start`,
                              ex ? "text-white" : "text-shaad-500"
                            )}
                            key={idx}
                          >
                            <span className="mr-2">•</span>
                            <span>{sub}</span>
                          </div>
                        ))
                      ) : (
                        <div
                          className={cn(
                            `text-sm`,
                            ex ? "text-white" : "text-shaad-500"
                          )}
                        >
                          {subTitle}
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {ex && (
            <ChevronDown
              className={cn(
                "absolute top-4 right-4 text-shaad-600 transition-transform duration-500 linear",
                isExpanded ? "rotate-180" : "rotate-0"
              )}
              size={24}
            />
          )}

          {!ex && subTitle && (
            <div className="mt-2 text-sm text-shaad-500">
              {Array.isArray(subTitle)
                ? subTitle.map((s, i) => <div key={i}>{s}</div>)
                : subTitle}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ExperienceCard;
