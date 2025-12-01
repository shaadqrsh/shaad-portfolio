import FadeInUp from "@/components/FadeInUp";
import Title from "@/components/Title";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AboutCardProps {
  children: ReactNode;
  title: string;
  classN?: string;
}

const AboutCard = ({ children, title, classN }: AboutCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col bg-shaad-200 p-8 rounded-4xl shadow-2xl",
        classN
      )}
    >
      <FadeInUp>
        <Title>{title}</Title>
      </FadeInUp>
      <FadeInUp delay={0.2}>{children}</FadeInUp>
    </div>
  );
};

export default AboutCard;
