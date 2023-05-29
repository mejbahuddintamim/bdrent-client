import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Main = () => {
  return (
    <div className="h-screen">
      <Navbar></Navbar>
      <div className="p-5 pt-2 sm:p-10 sm:pt-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
