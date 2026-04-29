"use client";
import Loader, { isImageCached, markImageCached, useSmartLoader } from "@/components/Loader";
import FadeInUp from "@/components/FadeInUp";
import ImageWithAbstractShape from "@/components/ImageWithAbstractShape";
import { homePara, name, title } from "@/lib/Data";
import { EMAIL, handleEmail } from "@/lib/Email";
import { links } from "@/lib/header";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/Card";

const Home = () => {

  const HOME_IMG = "/img_home.png";
  const [imgLoaded, setImgLoaded] = useState(() => isImageCached(HOME_IMG));
  const isLoading = useSmartLoader({
    loadingDependencies: [!imgLoaded],
  });

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="hidden">
        <Image
          src="/bg_home.png"
          alt="bg"
          width={1440}
          height={1080}
          priority
        />
      </div>
      <section className=" min-2xl:container text-white h-full flex items-center justify-center px-6 max-md:px-4 max-md:pb-10 relative">
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('/bg_home.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "1440px",
            filter: "blur(2px) brightness(0.4)",
          }}
        />
        <div className="flex flex-col-reverse md:flex-row items-center justify-center max-md:mt-6 xl:gap-40 lg:gap-28 gap-12 relative z-10">
          <motion.div
            className="flex-1 bg-shaad-200 p-8 rounded-4xl shadow-2xl"
            initial={{ opacity: 0 }}
            animate={
              !isLoading
                ? {
                  opacity: 1,
                  boxShadow: [
                    "0 0 15px var(--color-shaad-550)",
                    "0 0 35px var(--color-shaad-550)",
                    "0 0 15px var(--color-shaad-550)",
                  ],
                }
                : { opacity: 0 }
            }
            transition={{
              opacity: { duration: 0.5, delay: 0.5 },
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            style={{
              willChange: "box-shadow, opacity",
            }}
          >
            <FadeInUp
              delay={0.8}
              className="text-xl max-lg:text-base mb-2 text-shaad-600"
              enableAnimation={!isLoading}
            >
              {title}
            </FadeInUp>

            <FadeInUp
              delay={0.9}
              className="text-4xl lg:text-5xl md:text-3xl font-bold mb-4"
              enableAnimation={!isLoading}
            >
              {name}
            </FadeInUp>
            <FadeInUp
              delay={1.0}
              className="mt-6 mb-10 md:text-lg text-sm max-w-md"
              enableAnimation={!isLoading}
            >
              <Card className="text-white">
                {homePara}
              </Card>
            </FadeInUp>

            <div className="flex gap-3 flex-wrap">
              {links.map((l, idx) => {
                return (
                  <FadeInUp
                    key={idx}
                    delay={1.1 + idx * 0.1}
                    enableAnimation={!isLoading}
                  >
                    <Button
                      href={l.href}
                      target="_blank"
                      className="p-3 gap-1.5"
                      onClick={l.href === EMAIL ? handleEmail : undefined}
                    >
                      <l.label
                        className="text-white"
                        size={20}
                      />
                      <span className="text-white font-semibold max-sm:hidden">{l.text}</span>
                    </Button>
                  </FadeInUp>
                );
              })}
            </div>
          </motion.div>
          <ImageWithAbstractShape
            src="/img_home.png"
            alt="Shaad Qureshi"
            onLoad={() => { markImageCached(HOME_IMG); setImgLoaded(true); }}
            enableAnimation={!isLoading}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
