import { motion } from "motion/react";

interface ExperienceCardProps {
  date?: string;
  title: string;
  subTitle?: string | string[];
  img?: string;
  ex?: boolean;
}

const ExperienceCard = ({
  date,
  subTitle,
  title,
  img,
  ex = true,
}: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex items-start space-x-4"
    >
      {ex && (
        <div className="w-3 h-3 bg-shaad-600 rounded-full z-10 relative -left-[6.5px] self-center" />
      )}
      <div className="bg-shaad-300 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 w-full flex lg:flex-row flex-col">
        {img && ex && (
          <motion.img
            src={img}
            width={100}
            height={100}
            className="lg:mr-4 max-lg:mb-2 rounded-xl"
          />
        )}

        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {ex && <p className="text-md text-shaad-500 mb-1">{date}</p>}

          {subTitle &&
            (Array.isArray(subTitle) ? (
              subTitle.map((sub) => (
                <p
                  className="text-sm text-white mt-1"
                  key={sub}
                >
                  • {sub}
                </p>
              ))
            ) : (
              <p className="text-sm text-white">{subTitle}</p>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
