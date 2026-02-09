import { Certificates } from "@/lib/Certificates";
import FadeInUp from "@/components/FadeInUp";
import AboutCard from "../AboutCard";
import ExperienceCard from "../ExperienceCard";
import useManualCols from "@/hooks/useManualCols";
import { useRef } from "react";
import DateDisplay from "../DateDisplay";
interface CertificationsProps {
  enableAnimation?: boolean;
}

const Certifications = ({ enableAnimation = true }: CertificationsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cols = useManualCols(2, 1);

  return (
    <AboutCard title="Certifications">
      <div ref={containerRef} className="gap-4 mt-4 lg:grid lg:grid-cols-2 flex flex-col">
        {Certificates.map((ex, idx) => (
          <FadeInUp delay={0.1 * (idx % cols)} key={idx} enableAnimation={enableAnimation}>

            <ExperienceCard
              title={ex.title}
              subTitle={
                <>
                  {ex.subtitle} ● <DateDisplay date={ex.date} />
                </>
              }

              ex={false}
              url={ex.url}
            />
          </FadeInUp>
        ))}
      </div>
    </AboutCard>
  );
};

export default Certifications;
