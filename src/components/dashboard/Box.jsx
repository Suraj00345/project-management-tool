import React from "react";

const bgColors = {
  "Total Projects": "bg-gradient-to-r from-[#59B4FF] to-[#D0FF00]",
  "Total Tasks": "bg-gradient-to-tr from-[#FCB045] to-[#833AB4]",
  "Total Lists": "bg-gradient-to-r from-[#57C785] to-[#EDDD53]",
  "Average Tasks": "bg-gradient-to-l from-[#00D4FF] to-[#41FA97]",
};

const Box = ({ num, type }) => {
  const bgColor = bgColors[type] || "bg-gray-300";

  return (
    <div className={`h-24 sm:h-24 md:h-28 lg:h-38 w-full rounded-xl flex flex-col items-center justify-center p-4 gap-1 sm:gap-2 ${bgColor} `}>
      <h1 className="font-bold text-4xl  lg:text-5xl 2xl:text-6xl opacity-80 ">{num}</h1>
      <p className="font-medium text-sm lg:text-base text-center opacity-50">{type}</p>
    </div>
  );
};

export default Box;
