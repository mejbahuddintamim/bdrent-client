import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import SmallSpinner from "../Spinner/SmallSpinner";

const AddServiceForm = ({
  handleSubmit,
  loading,
  preview,
  handleImageChange,
}) => {
  return (
    <>
      <div className="flex items-center justify-center p-4 sm:p-10 border rounded-lg bg-gray-100">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="Enter the headline or title"
                className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
              />
            </div>
            {/*  */}
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="category"
                    className="mb-2 block text-base font-medium text-[#07074D]"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
                  >
                    <option value="" selected disabled>
                      Choose category
                    </option>
                    <option value="rent">Rent</option>
                    <option value="vacation">Vacation</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="location"
                    className="mb-2 block text-base font-medium text-[#07074D]"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    placeholder="Enter location"
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
                  />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="price"
                    className="mb-2 block text-base font-medium text-[#07074D]"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    placeholder="Enter price"
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="guestcapacity"
                    className="mb-2 block text-base font-medium text-[#07074D]"
                  >
                    Guest capacity
                  </label>
                  <input
                    type="number"
                    name="guestcapacity"
                    id="guestcapacity"
                    required
                    placeholder="Enter guest capacity"
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
                  />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="from"
                    className="mb-2 block text-base font-medium text-[#07074D]"
                  >
                    Available From
                  </label>
                  <input
                    type="date"
                    name="from"
                    id="from"
                    required
                    placeholder="Enter from"
                    min={new Date().toISOString().slice(0, 10)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="to"
                    className="mb-2 block text-base font-medium text-[#07074D]"
                  >
                    Available To
                  </label>
                  <input
                    type="date"
                    name="to"
                    id="to"
                    required
                    placeholder="Enter to"
                    min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                      .toISOString()
                      .slice(0, 10)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
                  />
                </div>
              </div>
            </div>
            {/*  */}

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="bedroom"
                    className="mb-2 block text-base font-medium text-[#07074D]"
                  >
                    Total bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedroom"
                    id="bedroom"
                    required
                    placeholder="Enter total bedroom"
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="bathroom"
                    className="mb-2 block text-base font-medium text-[#07074D]"
                  >
                    Total bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathroom"
                    id="bathroom"
                    required
                    placeholder="Enter total bathroom"
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
                  />
                </div>
              </div>
            </div>
            {/*  */}

            <div className="-mx-3 flex flex-wrap items-center">
              <div
                className={`w-full px-3 ${preview ? "sm:w-10/12" : "w-full"} `}
              >
                <div className="mb-5">
                  <label
                    htmlFor="image"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Select house image
                  </label>
                  <input
                    onChange={(event) =>
                      handleImageChange(event.target.files[0])
                    }
                    required
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className="block file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-1 file:px-3 w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-4 py-3 text-base font-medium text-gray-800 outline-none"
                  ></input>
                </div>
              </div>

              <div className="sm:w-2/12 mb-4 sm:mb-0 px-3 sm:px-0">
                {preview && (
                  <PhotoProvider>
                    <PhotoView src={preview}>
                      <img
                        src={preview}
                        className="w-15 h-12 object-cover rounded sm:mt-4 cursor-pointer "
                        alt="house_image_preview"
                      />
                    </PhotoView>
                  </PhotoProvider>
                )}
              </div>
            </div>
            {/*  */}
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Description
              </label>
              <textarea
                rows="4"
                name="description"
                id="description"
                required
                placeholder="Enter description"
                className="w-full rounded-md border border-[#e0e0e0] bg-gray-50 px-6 py-3 text-base font-medium text-gray-800 outline-none"
              ></textarea>
            </div>
            {/*  */}
            <div>
              <button className="hover:shadow-form w-full rounded-md bg-gradient-to-r from-sky-400 to-cyan-600 px-8 py-3 text-center text-base font-semibold text-white outline-none">
                {loading ? <SmallSpinner /> : "Add home"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddServiceForm;
