import React, { useEffect, useState } from "react";
import Loader from "../Layouts/Loader";
import EmptyProjects from "../components/Projects/EmptyProjects";
import ProjectCard from "../components/Projects/ProjectCard";
import CreateProject from "../components/Projects/CreateProject";

const ProjectsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    const arr = Array.from({ length: 30 }, (_, i) => i + 1);
    setProjects(arr);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isLoading && projects.length === 0) {
    return <EmptyProjects />;
  }

  return (
    <section className="mx-auto w-11/12 max-w-screen-2xl py-10 lg:py-16">
      <div className="flex flex-col items-start gap-4 lg:flex-row lg:justify-between lg:items-center ">
        <div className="">
          <h2 className="text-2xl font-bold">Your Projects</h2>
          <p className="mt-1 text-sm text-gray-400">Here you can manage all your projects.</p>
        </div>

        <CreateProject />
      </div>

      <section className="mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-10">
        {projects.map((project) => (
          <ProjectCard key={project} project={project} />
        ))}
      </section>
    </section>
  );
};

export default ProjectsPage;
