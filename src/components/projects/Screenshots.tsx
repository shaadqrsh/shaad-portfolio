import Title from "@/components/Title";
import { ProjectIdPageProps } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ImageDialog from "./ImageDialog";

const Screenshots = ({ project, url }: ProjectIdPageProps) => {
  return (
    <div className="flex flex-col gap-x-2 mt-8 border-shaad-100 border-2 p-4 rounded-lg w-full">
      <Title>Screenshots</Title>
      <div className="flex justify-center">
        <div className="max-w-7xl w-full">
          <Carousel
            className="my-2"
            plugins={[
              Autoplay({
                delay: 2000,
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
                    <motion.img
                      src={`/project_${url}/img_${i + 1}.png`}
                      alt={`Project image ${i + 1}`}
                      className="w-full max-h-[350px] rounded-lg object-contain"
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
