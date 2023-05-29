import { Tab } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { Fragment, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AnyMessage from "../Components/Checkout/AnyMessage";
import CheckoutCart from "../Components/Checkout/CheckoutCart";
import HouseRules from "../Components/Checkout/HouseRules";
import CheckoutForm from "../Components/Form/CheckoutForm";
import { AuthContext } from "../contexts/AuthProvider";

const Checkout = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const { user } = useContext(AuthContext);

  const {
    state: { homeData, totalNights },
  } = useLocation();

  let sub_total = parseFloat(homeData?.price) * totalNights;
  let total = sub_total + 100;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bookingData, setBookingData] = useState({
    home: {
      id: homeData?._id,
      image: homeData?.image,
      title: homeData?.title,
      location: homeData?.location,
      from: homeData?.from,
      to: homeData?.to,
    },
    hostEmail: homeData?.host?.email,
    comment: "",
    price: parseFloat(total),
    guestEmail: user?.email,
    guestName: user?.displayName,
  });

  return (
    <div className="md:flex gap-5 items-start justify-between w-full lg:px-6 py-4">
      {/* Details */}
      <div className="flex-1">
        <Tab.Group
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          defaultIndex={1}
        >
          <Tab.List>
            <div className="container flex flex-wrap items-center py-4 mx-auto overflow-y-auto whitespace-nowrap">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected ? "text-sky-600 font-medium" : "text-gray-600"
                    }
                  >
                    1. House rules
                  </button>
                )}
              </Tab>

              <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected ? "text-sky-600 font-medium" : "text-gray-600"
                    }
                  >
                    2. Any message for host?
                  </button>
                )}
              </Tab>

              <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected ? "text-sky-600 font-medium" : "text-gray-600"
                    }
                  >
                    3. Confirm and Pay
                  </button>
                )}
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <HouseRules
                setSelectedIndex={setSelectedIndex}
                homeData={{
                  ...homeData,
                  totalNights: totalNights,
                }}
              />
            </Tab.Panel>
            <Tab.Panel>
              <AnyMessage
                setSelectedIndex={setSelectedIndex}
                bookingData={bookingData}
                setBookingData={setBookingData}
                host={homeData?.host}
                totalNights={totalNights}
              />
            </Tab.Panel>
            <Tab.Panel>
              <Elements stripe={stripePromise}>
                <CheckoutForm bookingData={bookingData} />
              </Elements>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Cart */}
      <CheckoutCart
        homeData={{
          ...homeData,
          totalNights,
          total,
          sub_total,
        }}
      />
    </div>
  );
};

export default Checkout;
