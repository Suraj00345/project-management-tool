import React from "react";

const BoardHeader = ({Name}) => {
  return (
    <div className="mb-8 flex-shrink-0 ">
      <h1 className="text-2xl font-bold text-black mb-2">{Name}</h1>
    </div>
  );
};
export default BoardHeader;
