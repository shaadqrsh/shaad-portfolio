import { motion } from "motion/react";

interface ExperienceCardProps {
  date: string;
  title: string;
  subTitle?: string | string[];
}

const ExperienceCard = ({ date, subTitle, title }: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex items-start space-x-4"
    >
      <div className="w-3 h-3 bg-shaad-600 rounded-full z-10 relative -left-[6.5px] self-center" />
      <div className="bg-shaad-100 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 w-full">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-md text-shaad-500 mb-2">{date}</p>

        {subTitle && (
          Array.isArray(subTitle) ? ( 
            subTitle.map((sub) => (
              <p
                className="text-sm text-white"
                key={sub} 
              >
                • {sub}
              </p>
            ))
          ) : (
            <p className="text-sm text-white">
              {subTitle}
            </p>
          )
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
