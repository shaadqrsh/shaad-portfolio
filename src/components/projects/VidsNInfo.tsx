import Title from "@/components/Title";
import { cn } from "@/lib/utils";
import { ProjectIdPageProps } from "@/types";
import { motion } from "motion/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FadeInUp from "@/components/FadeInUp";
import Card from "@/components/ui/Card";

interface VidsNInfoProps extends ProjectIdPageProps {
  enableAnimation?: boolean;
}

const VidsNInfo = ({ project, enableAnimation = true }: VidsNInfoProps) => {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-8 mt-10 w-full",
        !project?.videos || (project?.videos.length === 0 && "md:grid-cols-1")
      )}
    >
      {project?.videos && project.videos.length > 0 && (
        <div className="p-8 bg-shaad-200 shadow-2xl rounded-4xl flex flex-col h-full items-start">
          <Title classN="mb-4">Gameplay and Reviews</Title>
          <div className="flex justify-center items-center h-full w-full">
            <div className="max-w-xl w-full">
              <Carousel className="mt-2 mb-4">
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
                <CarouselPrevious className="absolute top-1/2 max-[1440px]:-left-7 transform -translate-y-1/2 max-[1440px]:w-5 max-[1440px]:h-5" />
                <CarouselNext className="absolute top-1/2 max-[1440px]:-right-7 transform -translate-y-1/2 max-[1440px]:w-5 max-[1440px]:h-5" />
              </Carousel>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "p-8 bg-shaad-200 shadow-2xl rounded-4xl flex flex-col items-start h-full",
          (!project?.videos || project.videos.length === 0) && "md:col-span-2"
        )}
      >
        <Title classN="mb-2">Additional Information</Title>

        <FadeInUp delay={0.05} className="w-full" enableAnimation={enableAnimation}>
          <Card className="mt-2 w-full">
            {project?.additional.map((t, idx) => (
              <div key={idx}>
                {idx === 0 && <div className="h-2" />}
                <p>{t}</p>
                {idx !== project.additional.length - 1 ? (
                  <hr className="border-shaad-200 border-2 my-4" />
                ) : (
                  <div className="h-2" />
                )}
              </div>
            ))}
          </Card>
        </FadeInUp>
      </div>
    </motion.div>
  );
};

export default VidsNInfo;
