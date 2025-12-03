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
}

const ExperienceCard = ({
  date,
  endDate,
  subTitle,
  title,
  img,
  ex = true,
  inProgress = false,
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
            className="lg:mr-4 max-lg:mb-2 rounded-xl"
          />
        )}

        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {ex && date && (
            <DateDisplay
              date={date}
              endDate={endDate}
              inProgress={inProgress}
              className="text-md text-shaad-500 mb-2 mt-2 block"
            />
          )}

          {subTitle &&
            (Array.isArray(subTitle) ? (
              subTitle.map((sub, idx) => (
                <p
                  className={cn(
                    `text-sm mt-1`,
                    ex ? "text-white" : "text-shaad-500"
                  )}
                  key={idx}
                >
                  • {sub}
                </p>
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
