import Title from "@/components/Title";
import { ProjectIdPageProps } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ImageDialog from "./ImageDialog";

const Screenshots = ({ project, url }: ProjectIdPageProps) => {
  return (
    <div className="flex flex-col gap-x-2 mt-10 bg-shaad-200 shadow-2xl rounded-4xl p-8 w-full">
      <Title>Screenshots</Title>
      <div className="flex justify-center">
        <div className="max-w-7xl w-full">
          <Carousel
            className="mt-6 mb-4"
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {Array.from({ length: project?.imgCount || 0 }, (_, i) => (
                <CarouselItem
                  key={i}
                  className="flex justify-center lg:basis-1/3 "
                >
                  <ImageDialog src={`/project_${url}/img_${i + 1}.png`}>
                    <Image
                      src={`/project_${url}/img_${i + 1}.png`}
                      alt={`Project image ${i + 1}`}
                      width={1920}
                      height={1080}
                      className="rounded-lg w-full h-auto object-contain"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </ImageDialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="hidden lg:flex" /> */}
            {/* <CarouselNext className="hidden lg:flex" /> */}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Screenshots;
