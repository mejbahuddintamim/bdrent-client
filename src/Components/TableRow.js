import { format } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { deleteBooking } from "../api/bookings";
import { updateBookingStatus } from "../api/services";
import DeleteModal from "./Modal/DeleteModal";

const TableRow = ({ booking, setBookings, fetchBookings, role }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(null);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const modalHandler = (id) => {
    deleteBooking(id)
      .then((data) => {
        updateBookingStatus({ isBooked: false, id: booking?.home?.id })
          .then(() => {
            fetchBookings().then((data) => {
              setBookings(data);
              toast.success("Booking Canceled");
            });
          })
          .catch((err) => {
            toast.error(err.message, "1");
          });
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        closeModal();
      });
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <PhotoProvider>
                <PhotoView src={booking?.home.image}>
                  <img
                    alt="profile"
                    src={booking?.home.image}
                    className="mx-auto object-cover rounded h-10 w-10 cursor-pointer"
                  />
                </PhotoView>
              </PhotoProvider>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap font-medium">
              {booking?.home.title}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-medium capitalize">
          {booking?.home?.location}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-medium">
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
          {booking?.price}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="relative inline-block">
          {/* Dropdown toggle button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative z-10 flex items-center rounded-md border border-transparent bg-white p-2 text-sm text-gray-900"
          >
            <span className="font-medium">More</span>
            <svg
              className="mx-1 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div
              onClick={() => setIsDropdownOpen(false)}
              className="absolute right-0 z-20 mt-2 w-56 origin-top-right overflow-hidden rounded-md bg-white py-2 shadow-xl border"
            >
              <p className="block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 font-medium">
                Arrival: {format(new Date(booking?.home?.from), "P")}
              </p>

              <hr className="border-gray-200 " />

              <p className="block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 font-medium">
                Departure: {format(new Date(booking?.home?.to), "P")}
              </p>

              <hr className="border-gray-200 " />

              <p className="block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 font-medium">
                Transaction Id :{" "}
                <span className="text-xs">{booking?.transactionId}</span>
              </p>

              <hr className="border-gray-200 " />

              <p className="block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 font-medium">
                Comment : <span className="text-xs">{booking?.comment}</span>
              </p>
            </div>
          )}
        </div>{" "}
      </td>
      {/* user dropdown */}
      {(role === "admin" || role === "host") && (
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="relative inline-block">
            {/* Dropdown toggle button */}
            <button
              onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
              className="relative z-10 flex items-center rounded-md border border-transparent bg-white p-2 text-sm text-gray-900"
            >
              <span className="font-medium">User</span>
              <svg
                className="mx-1 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen2 && (
              <div
                onClick={() => setIsDropdownOpen2(false)}
                className="absolute right-0 z-20 mt-2 w-56 origin-top-right overflow-hidden rounded-md bg-white py-2 shadow-xl border"
              >
                {role === "host" && (
                  <>
                    {" "}
                    <p className="block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 font-medium">
                      User name: {booking?.guestName}
                    </p>{" "}
                    <hr className="border-gray-200 " />
                  </>
                )}
                <p className="block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 font-medium">
                  User email: {booking?.guestEmail}
                </p>
                {role === "admin" && (
                  <>
                    {" "}
                    <hr className="border-gray-200 " />
                    <p className="block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 font-medium">
                      Host email: {booking?.hostEmail}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>{" "}
        </td>
      )}

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={openModal}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Cancel</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
          id={booking._id}
        />
      </td>
    </tr>
  );
};

export default TableRow;
