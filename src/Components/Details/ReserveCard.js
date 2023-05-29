import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { differenceInCalendarDays } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

const ReserveCard = ({ homeData }) => {
  const navigate = useNavigate();

  const handleReserve = (e) => {
    e.preventDefault();

    let totalNights = differenceInCalendarDays(
      new Date(document.getElementById("checkout").value),
      new Date(document.getElementById("checkin").value)
    );
    console.log(totalNights);
    const data = {
      homeData,
      totalNights,
    };
    navigate("/checkout", { state: data });
  };

  return (
    <div className="block">
      <div className="sticky left-0 top-28 md:min-w-[20rem] lg:min-w-[25rem]">
        <form
          onSubmit={handleReserve}
          className="border-lightBorderColor rounded-xl border p-5 shadow"
        >
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-md font-normal">
              <span className="text-2xl font-medium">
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
                {homeData?.price}
              </span>
              /night
            </h1>
          </div>
          <div className="border-darkBorderColor relative mb-4 rounded-lg border">
            <div className="border-darkBorderColor flex w-full border-b">
              <div className="border-darkBorderColor relative z-10 w-1/2 select-none border-r p-3">
                <span className="block text-xs font-semibold">CHECKIN</span>
                <span className="mt-1 block font-medium">
                  <input
                    className="w-full rounded outline-none transition duration-100"
                    type="date"
                    id="checkin"
                    min={
                      homeData?.from > new Date().toISOString().slice(0, 10)
                        ? homeData?.from.split("T")[0]
                        : new Date().toISOString().slice(0, 10)
                    }
                    max={
                      homeData?.to.split("T")[0] >=
                      new Date().toISOString().slice(0, 10)
                        ? homeData?.to.split("T")[0]
                        : new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                            .toISOString()
                            .slice(0, 10)
                    }
                    defaultValue={
                      homeData?.from > new Date().toISOString().slice(0, 10)
                        ? homeData?.from.split("T")[0]
                        : new Date().toISOString().slice(0, 10)
                    }
                  />
                </span>
              </div>
              <div className="relative z-10 w-1/2 select-none p-3">
                <span className="block text-xs font-semibold">CHECKOUT</span>
                <span className="mt-1 block font-medium">
                  <input
                    className="w-full rounded outline-none transition duration-100"
                    type="date"
                    id="checkout"
                    min={
                      homeData?.from > new Date().toISOString().slice(0, 10)
                        ? new Date(
                            new Date(homeData?.from).getTime() +
                              24 * 60 * 60 * 1000
                          )
                            .toISOString()
                            .slice(0, 10)
                        : new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                            .toISOString()
                            .slice(0, 10)
                    }
                    max={
                      homeData?.to.split("T")[0] >=
                      new Date().toISOString().slice(0, 10)
                        ? homeData?.to.split("T")[0]
                        : new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                            .toISOString()
                            .slice(0, 10)
                    }
                    defaultValue={
                      homeData?.to.split("T")[0] >=
                      new Date().toISOString().slice(0, 10)
                        ? homeData?.to.split("T")[0]
                        : new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                            .toISOString()
                            .slice(0, 10)
                    }
                  />
                </span>
              </div>
            </div>
            <div className="relative select-none p-3">
              <div>
                <span className="block text-xs font-semibold">
                  GUESTS CAPACITY
                </span>
                <span className="mt-1 block font-medium">
                  {homeData?.guest_capacity} guests
                </span>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full bg-gradient-to-r from-sky-400 to-cyan-600 rounded-xl md:text-md px-4 py-2 text-lg font-medium md:py-3 text-white transition">
              Reserve{" "}
              <ChevronDoubleRightIcon className="w-5 h-5 text-white font-bold inline-block" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReserveCard;
