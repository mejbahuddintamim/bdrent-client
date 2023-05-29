import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-300 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-700">
          We can’t find that page
        </p>

        <Link
          to="/"
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-gradient-to-r from-sky-400 to-cyan-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
