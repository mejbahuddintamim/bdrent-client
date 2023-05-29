import React from "react";
import toast from "react-hot-toast";
import { getSearchResult } from "../../api/services";
import Img from "../../assets/searchForm.jpg";

const SearchForm = ({ setHomes, setLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const category = document.getElementById("cuisine").value;
    const location = document.getElementById("location").value.toLowerCase();
    const budget = document.getElementById("budget").value;
    const arrivalDate = document.getElementById("arrivaldate").value;
    const departureDate = document.getElementById("departuredate").value;

    if (category === "") {
      toast.error("Please choose category");
      setLoading(false);
      return;
    }
    if ((arrivalDate && !departureDate) || (!arrivalDate && departureDate)) {
      toast.error("Please choose both arrival and departure dates");
      setLoading(false);
      return;
    }

    const query = {
      category,
      location,
      price: budget,
      from: arrivalDate,
      to: departureDate,
    };

    getSearchResult(query)
      .then((data) => {
        console.log(data);
        setHomes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div
      className="w-full p-6 pt-8 sm:p-12 md:p-24 lg:p-32 lg:pt-28 m-auto mx-auto bg-cover bg-center rounded-md"
      style={{ backgroundImage: `url(${Img})` }}
    >
      <h1 className="text-3xl font-bold text-white text-center capitalize">
        Search houses for rent or vacation in Bangladesh
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-gray-900/70 px-6 pt-2 pb-6 rounded"
      >
        {/* category, location and budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Category
            </label>
            <select
              id="cuisine"
              className="w-full bg-gray-50 text-gray-900 rounded outline-none transition duration-100 p-3"
            >
              <option value="" selected disabled>
                Choose category
              </option>
              <option value="rent">Rent </option>
              <option value="vacation">Vacation </option>
            </select>{" "}
          </div>

          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Location
            </label>
            <input
              placeholder="Enter location"
              type="text"
              id="location"
              required
              className="w-full bg-gray-50 text-gray-900 rounded outline-none transition duration-100 p-3"
            />{" "}
          </div>

          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Budget (BDT)
            </label>
            <input
              placeholder="Enter budget"
              type="number"
              id="budget"
              className="w-full bg-gray-50 text-gray-900 rounded outline-none transition duration-100 p-3"
            />{" "}
          </div>

          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Arrival date
            </label>
            <input
              placeholder="Enter arrival date"
              type="date"
              id="arrivaldate"
              min={new Date().toISOString().slice(0, 10)}
              className="w-full bg-gray-50 text-gray-900 rounded outline-none transition duration-100 p-3"
            />{" "}
          </div>

          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Depature date
            </label>
            <input
              placeholder="Enter depature date"
              type="date"
              id="departuredate"
              min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 10)}
              className="w-full bg-gray-50 text-gray-900 rounded outline-none transition duration-100 p-3"
            />{" "}
          </div>

          <div>
            <label className="inline-block text-gray-50 opacity-0 text-sm sm:text-base mb-2">
              .
            </label>
            <input
              type="submit"
              required
              value="Find"
              className="w-full cursor-pointer hover:text-gray-100 bg-gradient-to-r from-sky-400 to-cyan-600 text-white rounded font-semibold outline-none transition duration-100 p-3"
            />{" "}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
