import React, { useCallback, useEffect, useState } from "react";
import Loader from "../layouts/Loader";
import EmptyProjects from "../components/projects/EmptyProjects";
import ProjectCard from "../components/projects/ProjectCard";
import CreateProject from "../components/projects/CreateProject";
import { getProjectsApi } from "../utils/api-client";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ProjectsPage = () => {
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    const res = await getProjectsApi({
      sortBy: "createdAt",
    });

    if (res?.total > 0) {
      setProjects(res.projects);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const onCreateProject = (project) => {
    setProjects((prev) => [project, ...prev]);
    navigate(`/projects/${project._id}`);
  };

  const onEditProject = (project) => {
    setProjects((prev) => prev.map((p) => (p._id === project._id ? project : p)));
  };

  const onDeleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p._id !== projectId));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && projects.length === 0) {
    return <EmptyProjects isOpen={createProjectOpen} setIsOpen={setCreateProjectOpen} onCreate={onCreateProject} />;
  }

  return (
    <section className="mx-auto w-11/12 max-w-screen-2xl py-10 lg:py-16">
      <Helmet>
        <title>Projects | Organivo</title>
        <meta name="description" content="Manage your projects efficiently." />
      </Helmet>

      <CreateProject onCreate={onCreateProject} isOpen={createProjectOpen} setIsOpen={setCreateProjectOpen} />

      <div className="flex flex-col items-start gap-4 lg:flex-row lg:justify-between lg:items-center ">
        <div className="">
          <h2 className="text-2xl font-bold">Your Projects</h2>
          <p className="mt-1 text-sm text-gray-400">Here you can manage all your projects.</p>
        </div>

        <button
          onClick={() => setCreateProjectOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 lg:py-3 lg:px-4 rounded-md cursor-pointer transition duration-200 flex items-center gap-2"
        >
          <span className="text-sm">Create New Project</span>
        </button>
      </div>

      <section className="mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4  gap-6 lg:gap-10">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} onEdit={onEditProject} onDelete={onDeleteProject} />
        ))}
      </section>
    </section>
  );
};

export default ProjectsPage;
