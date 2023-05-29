import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../../Components/Button/PrimaryButton";
import SmallSpinner from "../../Components/Spinner/SmallSpinner";
import { setAuthToken } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthProvider";

const Signup = () => {
  const {
    createUser,
    updateUserProfile,
    loading,
    setLoading,
    signInWithGoogle,
    setIsDropdownOpen,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [nid, setNid] = useState("");
  const [passport, setPassport] = useState("");

  // Nid formdata
  const formData2 = new FormData();
  formData2.append("image", nid);

  // Passport formdata
  const formData3 = new FormData();
  formData3.append("image", passport);

  const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Image Upload
    const profile = event.target.profile.files[0];

    // Adding profile image to imgbb and creating user
    const formData = new FormData();
    formData.append("image", profile);
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res.data.data.display_url);
        // Create User
        createUser(email, password)
          .then((result) => {
            updateUserProfile(name, res.data.data.display_url)
              .then((res) => {
                setAuthToken(result?.user);
                setLoading(false);
                toast.success("Signed up successfully");
                navigate(from, { replace: true });

                // Adding nid image to imgbb and link to database
                axios.post(url, formData2).then((res) => {
                  const nidImg = res.data.data.display_url;
                  axios
                    .put(`${process.env.REACT_APP_API_URL}/nidimage/${email}`, {
                      nidImg,
                    })
                    .then((res) => console.log(res.data));
                });

                // Adding passport image to imgbb and link to database
                axios.post(url, formData3).then((res) => {
                  const passportImg = res.data.data.display_url;
                  axios
                    .put(
                      `${process.env.REACT_APP_API_URL}/passportimage/${email}`,
                      {
                        passportImg,
                      }
                    )
                    .then((res) => console.log(res.data));
                });

                setLoading(false);
                setIsDropdownOpen(false);
              })
              .catch((err) => toast.error(err.message));
          })

          .catch((err) => {
            toast.error(err.message);
            setLoading(false);
          });
      })
      .catch((err) => toast.error(err.message));
  };

  // Google Signin
  const handleGoogleSignin = () => {
    if (!nid || !passport) {
      toast.error("Select NID & Passport Image");
      return setLoading(false);
    }
    signInWithGoogle()
      .then((result) => {
        setAuthToken(result?.user);
        // Nid
        axios.post(url, formData2).then((res) => {
          const nidImg = res.data.data.display_url;
          axios
            .put(
              `${process.env.REACT_APP_API_URL}/nidimage/${result?.user?.email}`,
              {
                nidImg,
              }
            )
            .then((res) => console.log(res.data));
        });
        // Passport
        axios.post(url, formData3).then((res) => {
          const passportImg = res.data.data.display_url;
          axios
            .put(
              `${process.env.REACT_APP_API_URL}/passportimage/${result?.user?.email}`,
              {
                passportImg,
              }
            )
            .then((res) => console.log(res.data));
        });
        //End
        toast.success("Logged in successfully");
        navigate(from, { replace: true });
        setLoading(false);
        setIsDropdownOpen(false);
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
          <h1 className="my-3 text-4xl font-bold">Sign up</h1>
          <p className="text-base text-gray-400">Create a new account</p>
        </div>
        <form
          noValidate=""
          action=""
          className="space-y-12 ng-untouched ng-pristine ng-valid"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-base">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-sky-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="image">Select Your Image:</label>
              <input
                type="file"
                name="profile"
                id="profile"
                required
                accept="image/*"
                className="block w-full border mt-2 rounded-md focus:z-10 focus:border-sky-500 focus:ring-sky-500 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-2 file:px-3 border-gray-300 bg-gray-200 text-gray-900"
              ></input>
            </div>
            <div>
              <label htmlFor="image"> Select NID Image:</label>
              <input
                type="file"
                name="nid"
                id="nid"
                required
                onChange={(e) => setNid(e.target.files[0])}
                accept="image/*"
                className="block w-full border mt-2 rounded-md focus:z-10 focus:border-sky-500 focus:ring-sky-500 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-2 file:px-3 border-gray-300 bg-gray-200 text-gray-900"
              ></input>
            </div>
            <div>
              <label htmlFor="image"> Select Passport Image:</label>
              <input
                type="file"
                name="passport"
                id="passport"
                required
                onChange={(e) => setPassport(e.target.files[0])}
                accept="image/*"
                className="block w-full border mt-2 rounded-md focus:z-10 focus:border-sky-500 focus:ring-sky-500 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-2 file:px-3 border-gray-300 bg-gray-200 text-gray-900"
              ></input>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-base">
                Email address
              </label>
              <input
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
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-base">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                required
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-sky-500 text-gray-900"
              />
            </div>
            <div className="pt-2">
              <PrimaryButton
                type="submit"
                classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100"
              >
                {loading ? <SmallSpinner /> : "Sign up"}
              </PrimaryButton>
            </div>{" "}
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
          <p className="px-3 text-sm text-gray-400">
            Signup with google account
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
          Already have an account yet?{" "}
          <Link
            to="/signin"
            className="hover:underline text-gray-500 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
