import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import SmallSpinner from "../../Components/Spinner/SmallSpinner";
import { getAllUsers, makeHost } from "../../api/user";

const AllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const handleRequest = (user) => {
    makeHost(user).then((data) => {
      console.log(data);
      getUsers();
    });
  };
  const getUsers = () => {
    setLoading(true);
    getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  };

  console.log(users);
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left font-medium"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left font-medium"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left font-medium"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left font-medium"
                  >
                    NID
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left font-medium"
                  >
                    Passport{" "}
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left font-medium"
                  >
                    Host Request
                  </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, i) => (
                    <tr key={i}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="block relative">
                              <PhotoProvider>
                                <PhotoView src={user?.profileImg}>
                                  <img
                                    alt="profile"
                                    src={user?.profileImg}
                                    className="rounded h-10 w-10 cursor-pointer"
                                  />
                                </PhotoView>
                              </PhotoProvider>
                            </div>
                          </div>
                          <div className="ml-2">
                            <p className="text-gray-900 whitespace-no-wrap font-medium">
                              {user?.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap font-medium">
                          {user?.email}
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {" "}
                        <p className="text-gray-900 whitespace-no-wrap font-medium">
                          {user?.role ? user.role : "User"}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap font-medium">
                          <PhotoProvider>
                            <PhotoView src={user?.nidImg}>
                              <img
                                src={user?.nidImg}
                                alt="passport_image"
                                className="rounded h-10 w-10 cursor-pointer"
                              />
                            </PhotoView>
                          </PhotoProvider>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap font-medium">
                          <PhotoProvider>
                            <PhotoView src={user?.passportImg}>
                              <img
                                src={user?.passportImg}
                                alt="passport_image"
                                className="rounded h-10 w-10 cursor-pointer"
                              />
                            </PhotoView>
                          </PhotoProvider>
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {user?.role && user.role === "requested" && (
                          <span
                            onClick={() => handleRequest(user)}
                            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              {loading ? <SmallSpinner /> : "Approve Request"}
                            </span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
