import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/imageUpload";
import { updateHome } from "../../api/services";
import UpdateServiceForm from "../Form/UpdateServiceForm";

const EditModal = ({ setIsEditModalOpen, isOpen, home, fetchHomes }) => {
  const [loading, setLoading] = useState(false);
  const [homeData, setHomeData] = useState(home);

  const handleImageUpdate = (image) => {
    imageUpload(image)
      .then((res) => {
        setHomeData({ ...homeData, image: res });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(homeData);
    const updatedData = Object.assign({}, { ...homeData });
    delete updatedData._id;
    setLoading(true);
    updateHome(updatedData)
      .then((data) => {
        console.log(data);
        toast.success("Home info updated");
        setLoading(false);
        fetchHomes();
        setIsEditModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="text-lg pb-3 font-medium leading-6 text-gray-900 flex justify-between"
                >
                  <h1>Update Home Info</h1>
                  <button onClick={() => setIsEditModalOpen(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />{" "}
                    </svg>
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <UpdateServiceForm
                    handleSubmit={handleSubmit}
                    homeData={homeData}
                    setHomeData={setHomeData}
                    handleImageUpdate={handleImageUpdate}
                    loading={loading}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
