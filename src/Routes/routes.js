import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Checkout from "../Pages/Checkout";
import AddHome from "../Pages/Dashboard/AddHome";
import AllBookings from "../Pages/Dashboard/AllBookings";
import AllUsers from "../Pages/Dashboard/AllUsers";
import BecomeAHost from "../Pages/Dashboard/BecomeAHost";
import ManageHomes from "../Pages/Dashboard/ManageHomes";
import Welcome from "../Pages/Dashboard/Welcome";
import Details from "../Pages/Details";
import Home from "../Pages/Home";
import Signin from "../Pages/Login/Signin";
import Signup from "../Pages/Login/Signup";
import ErrorPage from "../Pages/Shared/ErrorPage";
import AdminRoute from "./AdminRoute";
import HostRoute from "./HostRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/service-details/:id",
        element: <Details />,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_API_URL}/home/${params.id}`),
      },

      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Welcome />,
      },

      {
        path: "become-host",
        element: (
          <PrivateRoute>
            <BecomeAHost />
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <PrivateRoute>
            <AllBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "add-home",
        element: (
          <HostRoute>
            <AddHome />
          </HostRoute>
        ),
      },
      {
        path: "manage-homes",
        element: (
          <HostRoute>
            <ManageHomes />
          </HostRoute>
        ),
      },
    ],
  },
]);

export default router;
