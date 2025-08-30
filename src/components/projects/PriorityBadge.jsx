import React from "react";

const PriorityBadge = ({ priority }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-400 text-yellow-700";
      case "low":
        return "bg-green-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getPriorityText = () => {
    switch (priority) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
      default:
        return "";
    }
  };

  return (
    <div className={`absolute top-2 left-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getPriorityStyles()}`}>
      {getPriorityText()}
    </div>
  );
};

export default PriorityBadge;
