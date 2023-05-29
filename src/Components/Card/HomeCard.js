import { format, parseISO } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

// Date format
function formatDateRange(startDate, endDate) {
  const formattedStartDate = format(parseISO(startDate), "MMM d");
  const formattedEndDate = format(parseISO(endDate), "MMM d");
  const endMonth = format(parseISO(endDate), "MMM");

  if (formattedStartDate.substring(0, 3) === formattedEndDate.substring(0, 3)) {
    return `${formattedStartDate} - ${formattedEndDate.substring(4)}`;
  } else {
    return `${formattedStartDate} - ${endMonth} ${formattedEndDate.substring(
      4
    )}`;
  }
}

// Main function
const HomeCard = ({ home }) => {
  const time = formatDateRange(home?.from, home?.to);

  return (
    <div>
      <Link
        to={`/service-details/${home?._id}`}
        className="inline-block h-60 w-full"
      >
        <img
          className="object-cover object-center w-full h-full block rounded-xl bg-cover bg-center"
          src={home?.image}
          alt="home_img"
        />{" "}
      </Link>

      <div className="flex flex-row justify-between items-start mt-3">
        <div>
          <p className="text-gray-800 font-bold capitalize">
            {" "}
            {home?.location}
          </p>
          <p className="text-gray-600 capitalize"> {home?.title}</p>
          <p className="text-gray-600">{time}</p>
          <p className="text-gray-900">
            {" "}
            <span className="font-medium">
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
            </span>{" "}
            night
          </p>
        </div>
        <div className="flex flex-row items-center">
          <svg
            className="w-4 h-4"
            fill="#000000"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <p className="ml-1">5.0</p>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
