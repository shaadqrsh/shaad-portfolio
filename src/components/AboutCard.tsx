"use client";
import Title from "@/components/Title";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface AboutCardProps {
  children: ReactNode;
  title: string;
}

const AboutCard = ({ children, title }: AboutCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 border-shaad-100 border-2 p-8 rounded-4xl shadow-2xl max-sm:mt-8"
    >
      <Title>{title}</Title>
      {children}
    </motion.div>
  );
};

export default AboutCard;
