import { useCallback, useEffect, useState } from "react";
import BoardHeader from "../components/tasks/BoardHeader";
import { getProjectDetailsApi } from "../utils/api-client";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import ProjectScreen from "../components/tasks/ProjectScreen";
import { Helmet } from "react-helmet";

const TaskPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  const { projectId } = useParams();
  const navigate = useNavigate();

  const getProject = useCallback(async () => {
    setIsLoading(true);
    try {
      const projectData = await getProjectDetailsApi(projectId);
      setProject(projectData.project);
      if (projectData.lists?.length > 0) {
        setLists(projectData.lists);
        setTasks(projectData.tasks);
      }

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      navigate("/404");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, navigate]);

  const updateProjectTitle = (newTitle) => {
    setProject((prev) => ({ ...prev, title: newTitle }));
  };

  useEffect(() => {
    getProject();
  }, [getProject]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-200 h-full">
      <Helmet>
        <title>{project?.title || "Untitled Project"} | Organivo</title>
        <meta name="description" content="Manage your tasks and projects efficiently." />
      </Helmet>

      <div className="flex flex-col h-full w-full ">
        <div className="p-6 pb-0">
          <BoardHeader onUpdate={updateProjectTitle} projectId={project?._id} projectTitle={project?.title} />
        </div>

        <ProjectScreen lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default TaskPage;
