"use client";
import { useParams } from "next/navigation";

const ProjectIdPage = () => {
  const { project: title } = useParams();
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default ProjectIdPage;
