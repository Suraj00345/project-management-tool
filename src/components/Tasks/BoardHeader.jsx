import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BoardHeader = ({ Name }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex-shrink-0 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-black mb-2">{Name}</h1>
      <button
        onClick={() => navigate("/projects")}
        className="h-10 flex items-center gap-2 p-2 text-white w-auto border bg-blue-600 rounded-lg hover:cursor-pointer"
      >
        <ArrowLeft size={13} /> Go Back
      </button>
    </div>
  );
};

export default BoardHeader;
