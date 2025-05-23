"use client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Reveal from "./Reveal";

interface TitleProps {
  children: ReactNode;
  classN?: string;
}

const Title = ({ children, classN }: TitleProps) => {
  return (
    <Reveal
      x={-100}
      de={0.2}
    >
      <h2 className={cn("text-4xl mb-4 font-bold text-shaad-600", classN)}>
        {children}
      </h2>
    </Reveal>
  );
};

export default Title;
