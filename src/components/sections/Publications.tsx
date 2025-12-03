"use client";
import { Publications as publicationsData } from "@/lib/Publications";
import FadeInUp from "@/components/FadeInUp";
import AboutCard from "../AboutCard";
import ExperienceCard from "../ExperienceCard";
import useManualCols from "@/hooks/useManualCols";
import { useRef } from "react";
import DateDisplay from "../DateDisplay";

interface PublicationsProps {
    enableAnimation: boolean;
}

const Publications = ({ enableAnimation }: PublicationsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cols = useManualCols(2, 1);

    if (publicationsData.length === 0) return null;

    return (
        <AboutCard title="Publications">
            <div ref={containerRef} className="gap-4 mt-4 lg:grid lg:grid-cols-2 flex flex-col">
                {publicationsData.map((pub, idx) => (
                    <FadeInUp key={idx} enableAnimation={enableAnimation} delay={0.1 * (idx % cols)}>

                        <ExperienceCard
                            title={pub.name}
                            subTitle={
                                <>
                                    {pub.publishing} ● <DateDisplay date={pub.date} />
                                </>
                            }
                            ex={false}
                        />
                    </FadeInUp>
                ))}
            </div>
        </AboutCard>
    );
};

export default Publications;
