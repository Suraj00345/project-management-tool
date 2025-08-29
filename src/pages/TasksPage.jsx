import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import BoardHeader from "../components/Tasks/BoardHeader";
import List from "../components/Tasks/List";
import AddListForm from "../components/Tasks/AddListForm";
import { getProjectDetailsApi } from "../utils/api-client";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Layouts/Loader";
import ProjectScreen from "../components/Tasks/ProjectScreen";

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

  useEffect(() => {
    getProject();
  }, [getProject]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-200 h-full">
      <div className="flex flex-col h-full w-full ">
        <div className="p-6 pb-0">
          <BoardHeader Name={project?.title} />
        </div>

        <ProjectScreen lists={lists} setLists={setLists} tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default TaskPage;
