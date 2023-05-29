import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ReserveCard from "../Components/Details/ReserveCard";
import ThisPlaceOffer from "../Components/Details/ThisPlaceOffer";

const Details = () => {
  const homeData = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="w-full lg:px-24">
      <div className="mx-auto pt-8">
        <div className="mb-2 text-2xl font-medium lg:text-3xl">
          {homeData?.title}
        </div>
        <div className="mt-4 mb-6 flex items-center justify-between font-medium text-gray-600 capitalize">
          {homeData?.location}
        </div>
        <div className="relative mb-8 mt-4 overflow-hidden rounded-2xl block">
          <div className="flex h-full w-full gap-2">
            <div className="w-full">
              <div className="w-full h-[70vh] overflow-hidden  rounded-xl relative ">
                <img
                  alt=""
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="object-cover w-full"
                  sizes="100vw"
                  src={homeData?.image}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: 0,
                    color: "transparent",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative mb-8 mt-8 flex flex-col min-[810px]:flex-row gap-8 lg:gap-16 lg:mt-0">
          <div className="w-full">
            <div className="flex flex-col items-start justify-between gap-4 pb-6 sm:flex-row sm:items-center">
              <div className="h-full w-full flex-1">
                <div className="flex justify-between items-center">
                  <h1 className="mb-2 text-lg font-semibold md:text-2xl">
                    Hosted by {homeData?.host?.name}
                  </h1>
                  <div className="h-9 w-9 sm:h-12 sm:w-12 overflow-hidden rounded-full">
                    <img
                      src={homeData?.host?.image}
                      className="h-full w-full rounded-full object-cover"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex items-start sm:items-center flex-col min-[400px]:justify-start min-[400px]:flex-row gap-4 mt-2">
                  <div className="flex space-x-4 items-center font-semibold border border-gray-300 px-4 py-2 sm:px-8 sm:py-5 rounded-2xl">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      className="w-7 h-7"
                      focusable="false"
                      styles={{
                        display: "block",
                        height: "10px",
                        width: "10px",
                        fill: "currentColor",
                      }}
                    >
                      <path d="M28 4a2 2 0 0 1 1.995 1.85L30 6v7.839l1.846 5.537a3 3 0 0 1 .115.468l.03.24.009.24V30h-2v-2H2v2H0v-9.675a3 3 0 0 1 .087-.717l.067-.232L2 13.836V6a2 2 0 0 1 1.697-1.977l.154-.018L4 4zm2 18H2v4h28zm-1.388-6H3.387l-1.333 4h27.891zM28 6H4v8h2v-4a2 2 0 0 1 1.85-1.995L8 8h16a2 2 0 0 1 1.995 1.85L26 10v4h2zm-13 4H8v4h7zm9 0h-7v4h7z"></path>
                    </svg>
                    <p>{homeData?.bedrooms} bedrooms</p>
                  </div>
                  <div className="flex space-x-4 items-center font-semibold border border-gray-300 px-4 py-2 sm:px-8 sm:py-5 rounded-2xl">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      className="w-7 h-7"
                      focusable="false"
                      styles={{
                        display: "block",
                        height: "10px",
                        width: "10px",
                        fill: "currentColor",
                      }}
                    >
                      <path d="M7 1a3 3 0 0 0-2.995 2.824L4 4v27h2V4a1 1 0 0 1 .883-.993L7 3h11a1 1 0 0 1 .993.883L19 4v1h-5a1 1 0 0 0-.993.883L13 6v3h-3v2h19V9h-2V6a1 1 0 0 0-.883-.993L26 5h-5V4a3 3 0 0 0-2.824-2.995L18 1H7zm13 28a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM15 7h10v2H15V7z"></path>
                    </svg>
                    <p>{homeData?.bathrooms} bathrooms</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-darkBorderColor border-y py-8">
              <p className="text-md text-lightTextColor">
                {homeData?.description}
              </p>
            </div>
            <div className="py-8">
              <ThisPlaceOffer />
            </div>
          </div>
          <ReserveCard homeData={homeData} />
        </div>
      </div>
    </section>
  );
};

export default Details;
