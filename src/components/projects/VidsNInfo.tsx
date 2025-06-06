import Title from "@/components/Title";
import { cn } from "@/lib/utils";
import { ProjectIdPageProps } from "@/types";
import { motion } from "motion/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Reveal from "../Reveal";

const VidsNInfo = ({ project }: ProjectIdPageProps) => {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-8 mt-10 w-full",
        !project?.videos || (project?.videos.length === 0 && "md:grid-cols-1")
      )}
    >
      {project?.videos && project.videos.length > 0 && (
        <div className="p-8 border-2 border-shaad-100 rounded-lg flex flex-col h-full items-start">
          <Title classN="mb-2">Gameplay and Reviews</Title>
          <div className="flex justify-center items-center h-full w-full">
            <div className="max-w-xl w-full">
              <Carousel
                className="my-4"
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
              >
                <CarouselContent>
                  {project?.videos.map((v, idx) => (
                    <CarouselItem key={idx}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="w-full aspect-video"
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          src={v.replace("watch?v=", "embed/")}
                          title={`YouTube video ${idx + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg w-full h-full"
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
              </Carousel>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "p-8 border-2 border-shaad-100 rounded-lg flex flex-col items-start h-full",
          (!project?.videos || project.videos.length === 0) && "md:col-span-2"
        )}
      >
        <Title classN="mb-2">Additional Information</Title>
        <ul>
          {project?.additional.map((t, idx) => (
            <Reveal
              x={-100}
              key={idx}
            >
              <li className="mt-1 list-disc ml-4">{t}</li>
            </Reveal>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default VidsNInfo;
