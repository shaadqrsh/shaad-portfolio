"use client";
import Title from "@/components/Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { data } from "@/lib/projectId";
import { projectData } from "@/types";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      router.back();
    }
    setLoading(false);
  }, [url, router]);

  if (loading) {
    return <Loader2 className="animate-spin text-white" />;
  }

  return (
    <section className="text-white h-full w-full flex flex-col justify-center items-center max-md:pb-16">
      {/* <motion.img
        src={`/project_${url}/cover.jpg`}
        className="pb-4"
      /> */}

      <section className="text-white h-full w-full flex flex-col justify-center p-6 items-center">
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
                <h2 className="font-semibold mt-2">-{f.heading}</h2>
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
                <p className="lg:text-base text-sm font-semibold">-{r} </p>
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
      </section>
    </section>
  );
};

export default ProjectIdPage;
