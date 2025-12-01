"use client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  classN?: string;
}

const Title = ({ children, classN }: TitleProps) => {
  return (
    <h2
      className={cn(
        "text-4xl lg:text-4xl md:text-3xl font-bold pb-3 text-shaad-600",
        classN
      )}
    >
      {children}
    </h2>
  );
};

export default Title;
