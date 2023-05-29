import React, { useContext, useEffect, useState } from "react";
import HomeDataRow from "../../Components/HomeDataRow";
import { getHomes } from "../../api/services";
import { AuthContext } from "../../contexts/AuthProvider";

const ManageHomes = () => {
  const { user } = useContext(AuthContext);
  const [homes, setHomes] = useState([]);
  const fetchHomes = () => getHomes(user?.email).then((data) => setHomes(data));

  useEffect(() => {
    fetchHomes();
  }, [user]);

  console.log(homes.length);
  return (
    <>
      {homes.length === 0 ? (
        <div className="h-screen flex justify-center items-center text-3xl font-semibold text-gray-700">
          <h1>No Home Found</h1>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800  text-left text-base font-medium"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800  text-left text-base font-medium"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800  text-left text-base font-medium"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800  text-left text-base font-medium"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800  text-left text-base font-medium"
                      >
                        To
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800  text-left text-base font-medium"
                      >
                        Delete
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800  text-left text-base font-medium"
                      >
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {homes &&
                      homes.map((home) => (
                        <HomeDataRow
                          key={home?._id}
                          home={home}
                          fetchHomes={fetchHomes}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageHomes;
