import { BadgePlus } from "lucide-react";
import React from "react";

const EmptyProjects = () => {
  return (
    <div className="mx-auto h-full w-11/12 max-w-screen-2xl py-10 lg:py-16 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <button className="text-center flex flex-col items-center justify-center cursor-pointer group">
          <BadgePlus className="h-24 w-24 text-blue-200 lg:h-28 lg:w-28 group-hover:text-blue-300 transition duration-200" />
          <span className="mt-2 text-blue-500 group-hover:underline group-hover:text-blue-600 transition duration-200">
            Create your first project
          </span>
        </button>

        <p className="mt-1 text-gray-500">It seems you don't have any projects yet.</p>
      </div>
    </div>
  );
};

export default EmptyProjects;
