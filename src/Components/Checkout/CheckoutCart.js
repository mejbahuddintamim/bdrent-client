import React from "react";
const CheckoutCart = ({ homeData }) => {
  return (
    <div className="min-w-[30vw] pt-8 md:pt-4">
      <div className="border-gray-200 rounded-xl border p-8 shadow">
        <div className="border-gray-300 flex gap-3 border-b pb-4">
          <img
            src={homeData?.image}
            className="h-28 w-32 rounded-lg object-cover"
            alt="home_img"
          />
          <div>
            <h4 className="text-md mb-1">{homeData?.title}</h4>
          </div>
        </div>
        <div className="py-4 border-b border-gray-300">
          <h1 className="text-xl font-semibold">Price Details</h1>{" "}
          <div className="mt-2 space-y-3">
            <div className="flex items-center justify-between w-full">
              <span className="block text-gray-600 font-medium">
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
                {homeData?.price} x {homeData?.totalNights} night
              </span>
              <span className="block text-blackColor font-medium">
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
                {homeData?.sub_total}
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="block text-gray-600 font-medium">
                BD Rent service fee
              </span>
              <span className="block text-blackColor font-medium">
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
                100
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <span className="text-md font-semibold">Total (BDT)</span>
          <span className="text-md font-medium">
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
            {homeData?.total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
