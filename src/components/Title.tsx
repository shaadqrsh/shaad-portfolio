"use client";
import { ReactNode } from "react";
import Reveal from "./Reveal";

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <Reveal
      x={-100}
      de={0.2}
    >
      <h2 className="text-4xl mb-4 font-bold text-shaad-600">{children}</h2>
    </Reveal>
  );
};

export default Title;
