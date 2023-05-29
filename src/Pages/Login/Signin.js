import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import SmallSpinner from "../../Components/Spinner/SmallSpinner";
import { setAuthToken } from "../../api/auth";
import { isUserExist } from "../../api/user";
import { AuthContext } from "../../contexts/AuthProvider";

const Signin = () => {
  const [userEmail, setUserEmail] = useState("");
  const { logout } = useContext(AuthContext);

  const {
    signin,
    loading,
    setLoading,
    signInWithGoogle,
    resetPassword,
    setIsDropdownOpen,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Signin
    signin(email, password)
      .then((result) => {
        toast.success("Logged in successfully");
        setAuthToken(result?.user);
        navigate(from, { replace: true });
        setIsDropdownOpen(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  // Google Signin
  const handleGoogleSignin = () => {
    signInWithGoogle().then((result) => {
      isUserExist(result?.user?.email)
        .then((data) => {
          if (data === false) {
            toast.error("User not found, please signup first");
            setLoading(false);
            logout();
            return;
          }
          toast.success("Logged in successfully");
          setAuthToken(result?.user);
          navigate(from, { replace: true });
          setIsDropdownOpen(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    });
  };

  // Reset Password
  const handleReset = () => {
    if (!userEmail) {
      return toast.error("Please enter your email");
    }
    resetPassword(userEmail)
      .then(() => {
        toast.success("Please check your email for reset link");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-base text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          noValidate=""
          action=""
          onSubmit={handleSubmit}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-base">
                Email address
              </label>
              <input
                onBlur={(event) => setUserEmail(event.target.value)}
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-sky-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-base mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-sky-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <PrimaryButton
              type="submit"
              classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100"
            >
              {loading ? <SmallSpinner /> : "Sign in"}
            </PrimaryButton>
          </div>
        </form>
        <div className="space-y-1">
          <button
            onClick={handleReset}
            className="text-sm hover:underline text-gray-400"
          >
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-400">
            Signin with google account
          </p>
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleSignin}
            aria-label="Log in with Google"
            className="p-3 rounded-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Don't have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline font-medium text-gray-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
