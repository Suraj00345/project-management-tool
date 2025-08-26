import React from "react";
import Box from "../components/DashboardComponents/box";
import ProjectBox from "../components/DashboardComponents/ProjectBox";

const data = [
  { num: 10, type: "Total Projects" },
  { num: 25, type: "Running Projects" },
  { num: 15, type: "Completed Projects" },
  { num: 40, type: "Total Tasks" },
];

const ProjectBoxdata = [
  { name: "Project 1", Time: Date.now() },
  { name: "project 2", Time: Date.now() },
  { name: "Project 3", Time: Date.now() },
  { name: "Project 4", Time: Date.now() },
];

const DashboardPage = () => {
  return (
    <div className="ml-4 sm:ml-6 md:ml-8 lg:ml-10 mt-5 mr-4 sm:mr-6 md:mr-8 lg:mr-10">
      <h1 className="text-xl sm:text-2xl font-semibold">
        Welcome Back Suraj Kumar,
      </h1>

      {/* box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-6">
        {data.map((data, index) => (
          <Box key={index} num={data.num} type={data.type} />
        ))}
      </div>

      {/* recent projects */}
      <h1 className="text-xl sm:text-2xl font-medium pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 md:pb-7">
        Recent Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 sm:gap-4 md:gap-5 lg:gap-6">
        {ProjectBoxdata.map((data, index) => (
          <ProjectBox key={index} ProjectName={data.name} Time={data.Time} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
