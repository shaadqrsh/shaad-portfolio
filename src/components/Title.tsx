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
      <h2 className="text-3xl mb-2 font-bold text-shaad-600">{children}</h2>
    </Reveal>
  );
};

export default Title;
