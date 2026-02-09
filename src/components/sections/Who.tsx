import FadeInUp from "@/components/FadeInUp";
import { testimonials, whoAmI } from "@/lib/Data";
import AboutCard from "../AboutCard";
import Card from "@/components/ui/Card";

interface WhoProps {
  enableAnimation?: boolean;
}

const Who = ({ enableAnimation = true }: WhoProps) => {
  return (

    <AboutCard title="Who Am I?">
      <FadeInUp className="font-light tracking-wide w-full" enableAnimation={enableAnimation}>
        <Card className="mt-3">
          {whoAmI}
        </Card>
      </FadeInUp>
      <div className="flex justify-around items-center flex-wrap mt-4 gap-4">
        {testimonials.map((i, idx) => (
          <FadeInUp
            delay={0.1 * idx}
            key={idx}
            enableAnimation={enableAnimation}
          >
            <Card className="mt-4 p-4 rounded-xl flex flex-col justify-around items-center min-w-[180px]">
              <h1 className="text-3xl text-shaad-600 font-bold">{i.count}</h1>
              <p className="text-xl">{i.label}</p>
            </Card>
          </FadeInUp>
        ))}
      </div>
    </AboutCard>
  );
};

export default Who;
