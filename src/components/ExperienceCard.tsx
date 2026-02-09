import { cn } from "@/lib/utils";
import Image from "next/image";
import Card from "@/components/ui/Card";
import DateDisplay from "./DateDisplay";

import { ReactNode } from "react";

interface ExperienceCardProps {
  date?: string;
  endDate?: string;
  title: string;
  subTitle?: string | string[] | ReactNode;
  img?: string;
  ex?: boolean;
  inProgress?: boolean;
  location?: string;
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
}: ExperienceCardProps) => {
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
          "w-full flex lg:flex-row flex-col items-center",
          !ex && "min-h-[108px] items-start"
        )}
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
                className={cn(`text-sm`, ex ? "text-white" : "text-shaad-500")}
              >
                {subTitle}
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default ExperienceCard;
