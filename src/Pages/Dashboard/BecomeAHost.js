import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getRole, hostRequest } from "../../api/user";
import { AuthContext } from "../../contexts/AuthProvider";

const BecomeAHost = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRole(user?.email).then((data) => {
      console.log(data);
      setRole(data);
      setLoading(false);
    });
  }, [user]);

  const handleRequest = () => {
    const hostData = {
      email: user?.email,
      role: "requested",
    };
    hostRequest(hostData)
      .then((data) => {
        console.log(data);
        setRole("requested");
        toast.success("Your request has been submitted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {role ? (
        <div className="text-gray-700 pb-16 text-xl lg:text-3xl font-medium">
          Your host request is pending!
        </div>
      ) : (
        <>
          {!loading && (
            <>
              <div className="p-5 sm:p-10">
                <div className="max-w-lg p-6 sm:p-10 space-y-5 rounded-2xl border border-gray-200 bg-white text-center shadow-md">
                  <img
                    className="mx-auto w-8/12 sm:w-6/12"
                    src="https://img.freepik.com/premium-vector/programming-home_118813-4357.jpg"
                    alt="illustration"
                    loading="lazy"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Become A Host
                  </h3>
                  <p>
                    Become a host and earn money by renting your property and
                    services to the people.
                  </p>
                  <button
                    type="button"
                    onClick={handleRequest}
                    className="px-6 py-3 ml-4 overflow-hidden font-semibold rounded bg-gradient-to-r from-sky-400 to-cyan-600 text-white"
                  >
                    Submit Request
                  </button>{" "}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BecomeAHost;
