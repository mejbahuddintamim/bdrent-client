import { format } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { deleteHome } from "../api/services";
import DeleteModal from "./Modal/DeleteModal";
import EditModal from "./Modal/EditModal";

const HomeDataRow = ({ home, fetchHomes }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const modalHandler = (id) => {
    console.log(id);
    deleteHome(id)
      .then((data) => {
        console.log(data);
        fetchHomes();
        toast.success("Home deleted");
      })
      .catch((err) => console.log(err));
    closeModal();
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <PhotoProvider>
                <PhotoView src={home?.image}>
                  <img
                    alt="profile"
                    src={home?.image}
                    className="mx-auto object-cover rounded h-10 w-10 cursor-pointer"
                  />
                </PhotoView>
              </PhotoProvider>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{home?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">
        <p className="text-gray-900 whitespace-no-wrap capitalize">
          {home?.location}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">
        <p className="text-gray-900 whitespace-no-wrap">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline -mr-0.5 -ml-0.5 -mt-0.5"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M16.5 15.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            <path d="M7 7a2 2 0 1 1 4 0v9a3 3 0 0 0 6 0v-.5"></path>
            <path d="M8 11h6"></path>
          </svg>
          {home?.price}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(home?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(home?.to), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">
        <span
          onClick={openModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
          id={home._id}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        <EditModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          modalHandler={modalHandler}
          home={home}
          fetchHomes={fetchHomes}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  );
};

export default HomeDataRow;
