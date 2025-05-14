import { whoAmI } from "@/lib/Data";

import AboutCard from "../AboutCard";
import Reveal from "../Reveal";

const Who = () => {
  return (
    <AboutCard title="Who Am I?">
      <Reveal
        x={-100}
        de={0.2}
      >
        <p className="font-light tracking-wide">{whoAmI}</p>
      </Reveal>
    </AboutCard>
  );
};

export default Who;
