import { motion } from "motion/react";

interface ImageWithAbstractShapeProps {
  src: string;
  alt: string;
}

const ImageWithAbstractShape = ({ src, alt }: ImageWithAbstractShapeProps) => {
  const clipPathUrl = "/abstract.svg#myAbstractClip";

  return (
    <motion.div
      className="relative w-[500px] h-[500px]"
      style={{
        filter: "drop-shadow(0 0 10px rgba(252, 195, 90, 0.4))",
        WebkitFilter: "drop-shadow(0 0 10px rgba(252, 195, 90, 0.4))",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-shaad-600"
        style={{
          clipPath: `url(${clipPathUrl})`,
          WebkitClipPath: `url(${clipPathUrl})`,
        }}
      />

      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          clipPath: `url(${clipPathUrl})`,
          WebkitClipPath: `url(${clipPathUrl})`,
        }}
      />
    </motion.div>
  );
};

export default ImageWithAbstractShape;
