import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import Title from "../Title";

const Skills = () => {
  return (
    <motion.div className="flex-1 border-shaad-100 border-2 p-8 rounded-4xl shadow-2xl max-sm:mt-8">
      <Title>Skills</Title>

      <div className="grid grid-cols-3 gap-x-4">
        <div className="flex flex-col justify-center items-center gap-y-4 mt-4 border-2 border-shaad-200 p-4 rounded-4xl">
          <MapPin />
          <h3>HTML</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sit at
            vel nesciunt enim, cumque facere eligendi ut voluptate odit maiores
            explicabo cupiditate modi, molestiae rerum fuga non. Recusandae,
            quibusdam.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-4 mt-4 border-2 border-shaad-200 p-4 rounded-4xl">
          <MapPin />
          <h3>HTML</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sit at
            vel nesciunt enim, cumque facere eligendi ut voluptate odit maiores
            explicabo cupiditate modi, molestiae rerum fuga non. Recusandae,
            quibusdam.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-4 mt-4 border-2 border-shaad-200 p-4 rounded-4xl">
          <MapPin />
          <h3>HTML</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, sit at
            vel nesciunt enim, cumque facere eligendi ut voluptate odit maiores
            explicabo cupiditate modi, molestiae rerum fuga non. Recusandae,
            quibusdam.
          </p>
        </div>
      </div>
      <div></div>
    </motion.div>
  );
};

export default Skills;
