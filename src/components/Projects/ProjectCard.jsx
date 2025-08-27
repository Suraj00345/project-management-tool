import { Clock } from "lucide-react";
import ProjectCardDropdown from "./ProjectCardDropdown";

const ProjectCard = ({ project }) => {
  return (
    <div className="border border-gray-50 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer relative">
      <ProjectCardDropdown projectId={project.id} />

      <div className="bg-gradient-to-br rounded-b-lg from-purple-500 to-blue-500 min-h-28 flex items-center justify-center px-4 py-8 ">
        <h3 className="text-lg text-white font-semibold">Project {project.name}</h3>
      </div>

      <div className="p-4 flex items-center">
        <Clock className="h-4 w-4 text-gray-400" />
        <span className="ml-2 text-sm text-gray-500">Created: {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
