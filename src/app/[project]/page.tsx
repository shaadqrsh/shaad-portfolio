"use client";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";

import Title from "@/components/Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { data } from "@/lib/projectId";
import { cn } from "@/lib/utils";
import { projectData } from "@/types";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const ProjectIdPage = () => {
  const [project, setProject] = useState<projectData | null>(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const url = Array.isArray(params.project)
    ? params.project[0]
    : params.project;

  useEffect(() => {
    setLoading(true);
    if (url && typeof url === "string" && url in data) {
      setProject(data[url]);
    } else {
      router.replace("/projects");
    }
    setLoading(false);
  }, [url, router]);

  if (loading) {
    return <Loader2 className="animate-spin text-white" />;
  }

  return (
    <Parallax
      pages={2}
      className="bg-shaad-400"
    >
      <ParallaxLayer
        speed={0.5}
        factor={1.4}
      >
        <motion.img
          src={`/project_${url}/cover.jpg`}
          // className="h-full w-full bg-shaad-400"
        />
      </ParallaxLayer>

      <ParallaxLayer
        speed={1}
        offset={0.7}
      >
        <motion.section className="text-white flex flex-col justify-center p-6 items-center bg-shaad-400">
          <motion.div className="grid grid-cols-2 justify-between items-start gap-4">
            <div className="p-4 border-2 border-shaad-100 rounded-lg flex flex-col items-start">
              <Title classN="mb-0">Description</Title>
              <p className=" lg:text-base text-sm">{project?.desc}</p>

              <Title classN="mb-0 mt-4">Features</Title>
              {project?.features.map((f, idx) => (
                <div
                  className="flex flex-col items-start"
                  key={idx.toString()}
                >
                  <h2 className="font-semibold mt-2">• {f.heading}</h2>
                  <h3>{f.content}</h3>
                </div>
              ))}
            </div>

            <div className="p-4 border-2 border-shaad-100 rounded-lg flex flex-col items-start h-full">
              <Title classN="mb-0">Technology Used</Title>
              <div className="flex flex-wrap items-center gap-4">
                {project?.technologies.map((t, idx) => (
                  <div
                    key={idx.toString()}
                    className="p-2 bg-shaad-600 mt-2 rounded-lg"
                  >
                    <p>{t}</p>
                  </div>
                ))}
              </div>

              <Title classN="mt-6 mb-2">Key Responsibilities</Title>
              {project?.responsibilities.map((r, idx) => (
                <div key={idx.toString()}>
                  <p className="lg:text-base text-sm font-semibold">• {r} </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-x-2 mt-8 border-shaad-100 border-2 p-4 rounded-lg w-full">
            <Title>Screenshots</Title>
            <div className="flex justify-center">
              <div className="max-w-6xl w-full">
                <Carousel className="my-2">
                  <CarouselContent>
                    {Array.from({ length: project?.imgCount || 0 }, (_, i) => {
                      console.log(`Rendering img_${i + 1}.png`);
                      return (
                        <CarouselItem
                          key={i}
                          className="flex justify-center md:basis-1/2 lg:basis-1/3"
                        >
                          <motion.img
                            src={`/project_${url}/img_${i + 1}.png`}
                            alt={`Project image ${i + 1}`}
                            className="w-full max-h-[350px] rounded-lg"
                          />
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>

          <motion.div
            className={cn(
              "grid grid-cols-2 justify-between items-start gap-4 mt-6",
              project?.videos.length === 0 &&
                "grid-cols-1 justify-center items-center w-full"
            )}
          >
            {!(project?.videos.length === 0) && (
              <div className="p-4 border-2 border-shaad-100 rounded-lg flex flex-col h-full items-start">
                <Title classN="mb-2">Gameplay and Reviews</Title>
                <div className="flex justify-center items-center h-full w-full">
                  <div className="max-w-xl w-full">
                    <Carousel className="my-4">
                      <CarouselContent>
                        {project?.videos.map((v, idx) => (
                          <CarouselItem key={idx}>
                            <div className="w-full aspect-video">
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
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 border-2 border-shaad-100 rounded-lg flex flex-col items-start h-full">
              <Title classN="mb-0">Additional Information</Title>
              {project?.additional.map((t, idx) => (
                <p
                  key={idx}
                  className="mt-[3px]"
                >
                  • {t}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </ParallaxLayer>
    </Parallax>
  );
};

export default ProjectIdPage;
