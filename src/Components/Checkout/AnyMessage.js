import React, { useState } from "react";

const AnyMessage = ({
  setSelectedIndex,
  host,
  bookingData,
  setBookingData,
  totalNights,
}) => {
  const [commentData, setCommentData] = useState("");
  return (
    <>
      <h1 className="text-2xl font-semibold">Say hello to {host?.name}</h1>
      <p className="mb-7 mt-5 text-gray-500">
        Let {host?.name} know a little about yourself and also if you need
        something else.
      </p>
      <textarea
        value={commentData}
        onChange={(event) => setCommentData(event.target.value)}
        className="border border-gray-200 focus:outline-sky-500 block my-5 p-4 rounded-lg     w-full md:w-[85%] lg:w-[70%]"
        placeholder={`Hello ${host?.name}! Can't wait to spend ${totalNights} night in your home.`}
        name=""
        id=""
        rows="10"
      ></textarea>
      <button
        className="py-2 px-4 rounded-md bg-gradient-to-r from-sky-400 to-cyan-600 font-medium text-white"
        onClick={() => {
          setSelectedIndex(2);
          setBookingData((current) =>
            setBookingData({ ...current, comment: commentData })
          );
        }}
      >
        Agree and continue
      </button>
    </>
  );
};

export default AnyMessage;
