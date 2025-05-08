import { HTMLMotionProps, motion } from "motion/react";

interface ImageWithAbstractShapeProps extends HTMLMotionProps<"div"> {
  src: string;
  alt: string;
  backgroundColor?: string;
}

const ImageWithAbstractShape: React.FC<ImageWithAbstractShapeProps> = ({
  src,
  alt,
  backgroundColor = "var(--color-shaad-600)",
  ...props
}) => {
  const clipPathUrl = "/abstract.svg#myAbstractClip";

  return (
    <motion.div
      style={{
        position: "relative",
        width: "500px",
        height: "500px",
        filter: "drop-shadow(0 0 10px rgba(252, 195, 90, 0.4))",
        WebkitFilter: "drop-shadow(0 0 10px rgba(252, 195, 90, 0.4))",
      }}
      className="w-full max-w-lg mx-auto md:mx-0"
      {...props}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `url(${clipPathUrl})`,
          WebkitClipPath: `url(${clipPathUrl})`,
          backgroundColor: backgroundColor,
        }}
      />

      <motion.img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `url(${clipPathUrl})`,
          WebkitClipPath: `url(${clipPathUrl})`,
          objectFit: "cover",
        }}
      />
    </motion.div>
  );
};

export default ImageWithAbstractShape;
