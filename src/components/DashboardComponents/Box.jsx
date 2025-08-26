import React from "react";

const Box = ({num, type}) => {
  return (
    <div className="h-20 sm:h-24 md:h-25 w-full sm:w-48 md:w-52 lg:w-55 mt-4 sm:mt-6 md:mt-7 rounded-xl border-2 border-gray-300 flex flex-col items-center justify-center p-4 min-h-[80px] sm:min-h-[96px] md:min-h-[100px]">
      <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{num}</h1>
      <p className="font-medium text-sm sm:text-base text-center">{type}</p>
    </div>
  );
};

export default Box;