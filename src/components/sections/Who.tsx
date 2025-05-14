"use client";
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
        <p className="">{whoAmI}</p>
      </Reveal>
    </AboutCard>
  );
};

export default Who;
