import React, { useCallback, useEffect, useState } from "react";
import Box from "../components/dashboard/Box";
import { Helmet } from "react-helmet";
import { useAuthStore } from "../store/useAuthStore";
import { getProjectsApi, getStatsApi } from "../utils/api-client";
import Loader from "../layouts/Loader";
import ProjectCard from "../components/projects/ProjectCard";
import notfound from "../assets/file-corrupt-left-svgrepo-com.svg";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({});
  const { user } = useAuthStore();

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const [res, stats] = await Promise.all([
        getProjectsApi({
          sortBy: "createdAt",
          limit: 4,
        }),
        getStatsApi(),
      ]);

      setStats(stats);

      if (res?.total > 0) {
        setProjects(res.projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && projects.length === 0) {
    return (
      <div className="mx-auto w-11/12 max-w-screen-2xl py-10 lg:py-16 h-full flex flex-col">
        <Helmet>
          <title>Dashboard | Organivo</title>
          <meta name="description" content="Manage your account settings and preferences." />
        </Helmet>

        <section className="flex-1 flex flex-col items-center justify-center text-center">
          <div>
            <img src={notfound} alt="No projects" className="w-32 h-32 opacity-25" />
          </div>
          <h1 className="text-xl sm:text-2xl mt-8 font-semibold capitalize">Welcome Back {user.firstName},</h1>
          <p className=" text-gray-400 mt-2">
            You don't have any projects yet. Create a new project to get started! <br />
            <Link to="/projects" className="text-blue-500 hover:underline">
              click here
            </Link>{" "}
            to navigate to projects page
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto w-11/12 max-w-screen-2xl py-10 lg:py-16">
      <Helmet>
        <title>Dashboard | Organivo</title>
        <meta name="description" content="Manage your account settings and preferences." />
      </Helmet>

      <h1 className="text-xl sm:text-2xl font-semibold capitalize">Welcome Back {user.firstName},</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-6">
        {stats.map((data) => (
          <Box key={data.title} num={data.value} type={data.title} />
        ))}
      </div>

      <h1 className="text-xl sm:text-2xl font-medium pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 md:pb-7">Recent Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4  gap-6 lg:gap-10">
        {projects.length === 0 ? (
          <p className="col-span-5 text-center text-gray-400">No recent projects found.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project._id} project={project} onEdit={fetchProjects} onArchive={fetchProjects} onDelete={fetchProjects} />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
