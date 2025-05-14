import Title from "@/components/Title";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface AboutCardProps {
  children: ReactNode;
  title: string;
}

const AboutCard = ({ children, title }: AboutCardProps) => {
  return (
    <motion.div className="flex-1 border-shaad-100 border-2 p-8 rounded-4xl shadow-2xl">
      <Title>{title}</Title>
      {children}
    </motion.div>
  );
};

export default AboutCard;
