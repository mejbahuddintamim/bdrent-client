import { BanknotesIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React from "react";

const SSLCommerz = () => {
  const handlePayment = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/ssl-payment`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
          },
        }
      )
      .then((res) => window.location.replace(res.data.url))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold mt-3 mb-5">
          Let's make your payment with Mobile Banking
        </h1>
        <BanknotesIcon className="inline-block w-6 h-6 -mt-1" />
      </div>
      <button
        onClick={handlePayment}
        className="font-medium bg-gradient-to-r from-sky-400 to-cyan-600 rounded-md text-white px-5 py-2"
      >
        Pay with SSLCommerz
      </button>
    </div>
  );
};

export default SSLCommerz;
