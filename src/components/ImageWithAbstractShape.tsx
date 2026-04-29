import { motion } from "motion/react";
import Image from "next/image";

interface ImageWithAbstractShapeProps {
  src: string;
  alt: string;
  onLoad?: () => void;
  enableAnimation?: boolean;
}

const ImageWithAbstractShape = ({ src, alt, onLoad, enableAnimation = true }: ImageWithAbstractShapeProps) => {
  const clipPathId = "abstract-shape-clip";

  return (
    <motion.div
      className="relative xl:w-[500px] xl:h-[500px] lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] w-[300px] h-[300px] flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={enableAnimation ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d="M0.88,0.23 C0.95,0.35,0.98,0.52,0.92,0.66 C0.86,0.81,0.71,0.92,0.56,0.96 C0.41,1,0.26,0.96,0.15,0.86 C0.04,0.76,-0.03,0.6,0.01,0.45 C0.05,0.3,0.2,0.16,0.34,0.09 C0.48,0.02,0.63,0.02,0.75,0.09 C0.81,0.13,0.85,0.18,0.88,0.23 Z" />
          </clipPath>
        </defs>
      </svg>

      <motion.svg
        className="absolute w-full h-full overflow-visible"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        style={{
          zIndex: 0,
          scale: 0.98,
          willChange: "filter",
        }}
        animate={{
          filter: [
            "drop-shadow(0 0 20px var(--color-shaad-600))",
            "drop-shadow(0 0 35px var(--color-shaad-600))",
            "drop-shadow(0 0 20px var(--color-shaad-600))",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M0.88,0.23 C0.95,0.35,0.98,0.52,0.92,0.66 C0.86,0.81,0.71,0.92,0.56,0.96 C0.41,1,0.26,0.96,0.15,0.86 C0.04,0.76,-0.03,0.6,0.01,0.45 C0.05,0.3,0.2,0.16,0.34,0.09 C0.48,0.02,0.63,0.02,0.75,0.09 C0.81,0.13,0.85,0.18,0.88,0.23 Z"
          fill="transparent"
          stroke="var(--color-shaad-600)"
          strokeWidth="0.02"
        />
      </motion.svg>

      <div
        className="absolute inset-0 bg-shaad-600"
        style={{
          clipPath: `url(#${clipPathId})`,
          zIndex: 10,
        }}
      />
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: `url(#${clipPathId})`,
          zIndex: 10,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          onLoad={onLoad}
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 300px, (max-width: 1280px) 400px, 500px"
        />
      </div>
    </motion.div>
  );
};

export default ImageWithAbstractShape;
