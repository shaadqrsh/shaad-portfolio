import { motion } from "motion/react";

interface ExperienceCardProps {
  date: string;
  title: string;
  subTitle?: string;
}

const ExperienceCard = ({ date, subTitle, title }: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex items-start space-x-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-[2px] h-full bg-shaad-600 absolute left-[8.5px] top-0" />
        <div className="w-3 h-3 bg-shaad-600 rounded-full z-10 relative left-[3px]" />
      </div>

      <div className="bg-shaad-100 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 ml-4 w-full">
        <p className="text-sm text-white">{date}</p>
        <h2 className="text-md font-semibold text-white">{title}</h2>
        <p className="text-sm text-white">{subTitle}</p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
