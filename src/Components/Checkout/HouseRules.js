import {
  BellSlashIcon,
  FaceSmileIcon,
  FireIcon,
  HomeModernIcon,
  LockClosedIcon,
  NoSymbolIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import React from "react";

const HouseRules = ({ setSelectedIndex, homeData }) => {
  return (
    <>
      <span className="rounded-lg inline-block text-gray-900 text-lg font-medium border border-gray-200 py-3 px-3 my-2">
        House rules for {homeData?.totalNights} night in {homeData?.location}
      </span>

      <div>
        <div className="flex items-center my-2 mt-6 mx-auto max-w-7xl flex-row">
          <div className="inline-flex p-2 rounded items-center justify-center flex-shrink-0 mt-1 text-neutral-600 bg-gray-50 mr-3">
            <UserGroupIcon className=" w-5 h-5" />
          </div>
          <div className="flex-grow prose sm:text-left prose-md">
            <p className="text-gray-800 text-medium">
              Suitable for children and infants
            </p>
          </div>
        </div>
        <div className="flex items-center  my-2 mx-auto max-w-7xl flex-row">
          <div className="inline-flex p-2 rounded items-center justify-center flex-shrink-0 mt-1 text-neutral-600 bg-gray-50 mr-3">
            <FaceSmileIcon className=" w-5 h-5" />
          </div>
          <div className="flex-grow prose sm:text-left prose-md">
            <p className="text-gray-800 text-medium">Pets allowed</p>
          </div>
        </div>

        <div className="flex items-center  my-2 mx-auto max-w-7xl flex-row">
          <div className="inline-flex p-2 rounded items-center justify-center flex-shrink-0 mt-1 text-neutral-600 bg-gray-50 mr-3">
            <FireIcon className=" w-5 h-5" />
          </div>
          <div className="flex-grow prose sm:text-left prose-md">
            <p className="text-gray-800 text-medium">Smoking allowed</p>
          </div>
        </div>
        <div className="flex items-center  my-2 mx-auto max-w-7xl flex-row">
          <div className="inline-flex p-2 rounded items-center justify-center flex-shrink-0 mt-1 text-neutral-600 bg-gray-50 mr-3">
            <NoSymbolIcon className=" w-5 h-5" />
          </div>
          <div className="flex-grow prose sm:text-left prose-md">
            <p className="text-gray-800 text-medium">No drug or alcohol</p>
          </div>
        </div>
        <div className="flex items-center  my-2 mx-auto max-w-7xl flex-row">
          <div className="inline-flex p-2 rounded items-center justify-center flex-shrink-0 mt-1 text-neutral-600 bg-gray-50 mr-3">
            <LockClosedIcon className=" w-5 h-5" />
          </div>
          <div className="flex-grow prose sm:text-left prose-md">
            <p className="text-gray-800 text-medium">
              Lock the door while leaving
            </p>
          </div>
        </div>
        <div className="flex items-center  my-2 mx-auto max-w-7xl flex-row">
          <div className="inline-flex p-2 rounded items-center justify-center flex-shrink-0 mt-1 text-neutral-600 bg-gray-50 mr-3">
            <BellSlashIcon className=" w-5 h-5" />
          </div>
          <div className="flex-grow prose sm:text-left prose-md">
            <p className="text-gray-800 text-medium">No loud music or noise</p>
          </div>
        </div>
        <div className="flex items-center  my-2 mx-auto max-w-7xl flex-row">
          <div className="inline-flex p-2 rounded items-center justify-center flex-shrink-0 mt-1 text-neutral-600 bg-gray-50 mr-3">
            <HomeModernIcon className=" w-5 h-5" />
          </div>
          <div className="flex-grow prose sm:text-left prose-md">
            <p className="text-gray-800 text-medium">Quiet hours after 10 PM</p>
          </div>
        </div>
      </div>
      <button
        className="py-2 font-medium px-4 mt-4 rounded-md bg-gradient-to-r from-sky-400 to-cyan-600 text-white"
        onClick={() => setSelectedIndex(1)}
      >
        Agree and continue
      </button>
    </>
  );
};

export default HouseRules;
