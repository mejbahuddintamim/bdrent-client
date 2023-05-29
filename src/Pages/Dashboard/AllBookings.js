import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import TableRow from "../../Components/TableRow";
import {
  getAllBookings,
  getHostBookings,
  getUserBookings
} from "../../api/bookings";
import { getRole } from "../../api/user";
import { AuthContext } from "../../contexts/AuthProvider";

const AllBookings = () => {
  const [loading, setLoading] = useState(false);

  // Getting user role
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(false);
  useEffect(() => {
    setLoading(true);
    getRole(user?.email).then(data => {
      console.log(data);
      setLoading(false);
      setRole(data);
    });
  }, [user?.email]);

  // Bookings
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    if (role === "admin") {
      return getAllBookings();
    } else if (role === "host") {
      return getHostBookings(user?.email);
    } else {
      return getUserBookings(user?.email);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBookings()
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [user?.email, role]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : bookings.length !== 0 ? (
        <div className="mx-auto px-4 sm:px-8">
          <div className="py-6">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
              <div className="inline-block min-w-full shadow rounded-lg">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-gray-100  border-b border-gray-200 text-gray-800  text-left text-base font-medium"
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
                        More Info
                      </th>
                      {(role === "admin" || role === "host") && (
                        <th
                          scope="col"
                          className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800  text-left text-base font-medium"
                        >
                          User Info
                        </th>
                      )}
                      <th
                        scope="col"
                        className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800  text-left text-base font-medium"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings &&
                      bookings.map(booking => (
                        <TableRow
                          key={booking._id}
                          booking={booking}
                          fetchBookings={fetchBookings}
                          role={role}
                          setBookings={setBookings}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="h-screen text-gray-700 font-medium gap-5 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl">
            There's no booking data available right now.
          </div>
        </>
      )}
    </>
  );
};

export default AllBookings;
