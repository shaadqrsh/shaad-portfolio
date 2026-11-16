import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

const SIZES = { sm: "size-9 rounded-lg", md: "size-12 rounded-[10px]", lg: "size-16 rounded-[14px]" };
const PX = { sm: 36, md: 48, lg: 64 };

interface LogoProps {
  src?: string | null;
  alt: string;
  size?: keyof typeof SIZES;
  /** Shown on a dark tile when there's no image, e.g. a trophy for a jam. */
  fallback: ReactNode;
}

/** A square organisation or event logo on a white tile. */
const Logo = ({ src, alt, size = "md", fallback }: LogoProps) =>
  src ? (
    <span className={cn("relative shrink-0 overflow-hidden bg-white", SIZES[size])}>
      <Image src={src} alt={alt} fill sizes={`${PX[size]}px`} className="object-contain" />
    </span>
  ) : (
    <span className={cn("grid shrink-0 place-items-center bg-shaad-200 text-shaad-500 [&_svg]:size-1/2", SIZES[size])}>
      {fallback}
    </span>
  );

export default Logo;
