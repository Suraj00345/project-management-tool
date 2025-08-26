import React from "react";
import { Clock } from "lucide-react";

const ProjectBox = ({ProjectName, Time}) => {
  return (
    <div className="border border-gray-300 shadow h-24 sm:h-26 md:h-28 sm:w-40 md:w-43 lg:w-45 rounded-2xl">
      <div className="h-16 sm:h-18 md:h-20 lg:h-22 w-auto rounded-2xl bg-indigo-500">
        <p className="text-white pl-4 sm:pl-6 md:pl-8 lg:pl-9 pt-4 sm:pt-6 md:pt-7 lg:pt-8 text-sm sm:text-base">{ProjectName}</p>
      </div>
      <p className="flex items-center text-xs pl-2 sm:pl-3 mt-1 gap-1">
        <Clock size={11} />
        {Time}
      </p>
    </div>
  );
};

export default ProjectBox;