import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen text-gray-700">
      <p className="text-7xl font-semibold">L</p>
      <div className="w-10 h-10 border-8 border-dashed rounded-full animate-spin mt-5 border-sky-500"></div>
      <p className="text-7xl font-semibold">ading</p>
    </div>
  );
};

export default Spinner;
