import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import PrimaryButton from "../Button/PrimaryButton";
import AdminMenu from "./AdminMenu";
import HostMenu from "./HostMenu";
import UserMenu from "./UserMenu";

const Sidebar = ({ role, loading }) => {
  const { user, logout } = useContext(AuthContext);
  const [isActive, setActive] = useState("false");
  console.log(role);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="text-gray-900 body-font border-b border-gray-300 shadow flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold text-gray-800 py-5">
            <Link to="/">BD Rent</Link>
          </div>
        </div>

        <button onClick={handleToggle} className="p-4">
          <Bars3Icon className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-50 border-r border-gray-200 shadow w-64 space-y-6 px-2 py-4 pt-2 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Branding & Profile Info */}
          <Link to="/dashboard" className="block py-2 sm:p-4 pt-0">
            <div className="mx-4 rounded-lg md:mx-auto">
              <div className="m-auto flex w-full flex-col items-start sm:flex-row">
                <div className="flex sm:m-0 sm:mr-10">
                  <div className="m-auto mr-4 h-20 w-20 items-center justify-center sm:h-32 sm:w-32">
                    <img
                      alt="profile"
                      src={user?.photoURL}
                      className="mx-auto h-20 w-20 rounded-2xl object-cover sm:h-32 sm:w-32"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full pt-4">
                <h1 className="text-lg font-semibold text-gray-800 sm:text-xl">
                  {user?.displayName}{" "}
                </h1>
                <p className="text-sm text-gray-500 md:text-base pt-1">
                  {user?.email}
                </p>
              </div>
            </div>
          </Link>
          <hr />

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mt-5 rounded transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <HomeIcon className="w-5 h-5" />

                <span className="mx-4 font-medium">Home</span>
              </NavLink>
              {role && role !== "requested" ? (
                <>{role === "admin" ? <AdminMenu /> : <HostMenu />} </>
              ) : (
                <UserMenu />
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <PrimaryButton
            handler={logout}
            classes="flex block text-gray-50 w-full rounded-lg items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
