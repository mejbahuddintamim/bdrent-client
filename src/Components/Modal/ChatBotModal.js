import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import SmallSpinner from "../Spinner/SmallSpinner";

const ChatBotModal = ({
  modalHandler,
  closeModal,
  isOpen,
  apiResponse,
  loading,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-end p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-sm h-[80vh] transform overflow-hidden rounded-2xl bg-gray-50 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col h-full">
                  <div className="px-6 py-4 shadow-sm text-lg font-medium leading-6 bg-sky-200 text-gray-900 flex justify-between sticky top-0">
                    <h1>BD Rent Chat Bot</h1>
                    <button onClick={() => closeModal(true)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto pt-5">
                    {/* Display response data */}
                    {apiResponse && (
                      <>
                        {apiResponse.map((res, i) => (
                          <div
                            key={i}
                            className="p-2 flex w-full max-w-xs space-x-3"
                          >
                            <img
                              src={
                                res?.isUser
                                  ? "https://i.ibb.co/bHCY9h4/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue.png"
                                  : "https://i.ibb.co/k3J8FKw/robot-chat-bot-concept-illustration-vector.jpg"
                              }
                              className="h-12 w-12 rounded-full"
                              alt=""
                            />
                            <div>
                              <div
                                className={`${
                                  res?.isUser ? "bg-blue-200" : "bg-gray-200"
                                } rounded-r-lg rounded-bl-lg p-3`}
                              >
                                <p className="text-sm">{res?.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <form
                    className="flex gap-2 w-full p-3 bg-gray-100"
                    onSubmit={modalHandler}
                  >
                    <input
                      type="text"
                      name="message"
                      id="message"
                      required
                      placeholder="Enter your message"
                      className="w-full rounded-md border border-[#d1d1d1] bg-gray-200 px-4 py-3 text-base text-gray-800 outline-none"
                    />
                    <button className="hover:shadow-form rounded-md bg-gradient-to-r from-sky-400 to-cyan-600 px-4 text-center text-base font-semibold text-white outline-none">
                      {loading ? <SmallSpinner /> : "Submit"}
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChatBotModal;
