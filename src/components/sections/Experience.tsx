"use client";
import Logo from "@/components/ui/Logo";
import Meta from "@/components/ui/Meta";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { dateKey, dateRange, yearRange } from "@/lib/dates";
import { experience } from "@/lib/Experience";
import { Briefcase } from "lucide-react";
import { useState } from "react";
import MasterDetail, { PointList } from "./MasterDetail";

const roles = [...experience].sort((a, b) => dateKey(b.startDate) - dateKey(a.startDate));
const company = (location: string) => location.split(",")[0];

/** Roles, newest first, as a list beside the selected role's details. */
const Experience = () => {
  const [selected, setSelected] = useState(0);
  const role = roles[selected];

  return (
    <Section title="Experience" count={roles.length}>
      <MasterDetail
        label="Roles"
        selected={selected}
        onSelect={setSelected}
        items={roles.map((r) => ({
          key: `${r.title}-${r.startDate}`,
          logo: <Logo src={r.image} alt={company(r.location)} size="sm" fallback={<Briefcase />} />,
          title: r.title,
          sub: company(r.location),
          side: yearRange(r),
        }))}
        detail={
          <>
            <div className="flex items-center gap-4">
              <Logo src={role.image} alt={company(role.location)} size="lg" fallback={<Briefcase />} />
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="font-display text-xl leading-tight font-bold">{role.title}</h3>
                {role.inProgress && <Tag>Current</Tag>}
              </div>
            </div>
            <Meta
              items={[
                ["Where", role.location],
                ["When", dateRange(role)],
              ]}
            />
            <PointList points={role.subtitle} />
          </>
        }
      />
    </Section>
  );
};

export default Experience;
