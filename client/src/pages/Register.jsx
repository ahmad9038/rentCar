import React, { useState } from "react";
import icons from "../constants/icons";
import { apiRequest, validateEmail } from "../utils";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import SnackBarComponent from "../components/SnackBarComponent";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [link, setLink] = useState("");

  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  //values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setErrorMessage("Fill all fields");
        return;
      }

      if (!validateEmail(email)) {
        setErrorMessage("Invalid email address");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Enter same password");
        return;
      }

      const res = await apiRequest({
        url: "/users/register",
        data: { firstName, lastName, email, password, confirmPassword },
        method: "POST",
      });

      console.log(res);

      // if (res && res.status == false) {
      //   setErrorMessage(res.error);
      // } else {
      //   setErrorMessage("");
      // window.location.replace("/login");
      // }

      setSeverity(res.success ? "success" : "error");
      setMessage(res.message);

      if (res.success == "false") {
        setLink(res.link);
      }

      setSnackbarOpen(true);

      if (res && res.status == true) {
        window.location.replace("/login");
      }

      setSeverity(res.success ? "success" : "error");
      setMessage(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full h-screen items-center justify-center ">
      <div className="font-[sans-serif] text-[#333]">
        <div className="relative  min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className=" absolute z-10  border border-stroke-1 bg-n-8  w-full sm:w-[450px]  rounded-md p-6 max-w-md  max-md:mx-auto">
            <div className="space-y-4">
              <div className="mb-10">
                <h3 className="text-3xl text-n-1 h3 font-extrabold">
                  Register
                </h3>
                {/* <p className="text-sm mt-4">
                  Sign in to your account and explore a world of possibilities.
                  Your journey begins here.
                </p> */}
              </div>
              <div>
                <label className="text-sm text-n-1 mb-1 block">
                  First name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-n-1 mb-1 block">Last name</label>
                <div className="relative flex items-center">
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                    placeholder="Dae"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-n-1 mb-1 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-n-1 mb-1 block">Password</label>
                <div className=" flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                    placeholder="abc"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="relative flex items-center"
                  >
                    {showPassword ? (
                      <div className="absolute right-4 cursor-pointer">
                        <icons.LuEye fontSize="20px" className="text-n-3" />
                      </div>
                    ) : (
                      <div className=" absolute right-4 cursor-pointer">
                        <icons.LuEyeOff fontSize="20px" className="text-n-3" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm text-n-1 mb-1 block">
                  Confirm Password
                </label>
                <div className=" flex items-center">
                  <input
                    name="password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                    placeholder="abc"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="relative flex items-center"
                  >
                    {showConfirmPassword ? (
                      <div className="absolute right-4 cursor-pointer">
                        <icons.LuEye fontSize="20px" className="text-n-3" />
                      </div>
                    ) : (
                      <div className=" absolute right-4 cursor-pointer">
                        <icons.LuEyeOff fontSize="20px" className="text-n-3" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="!mt-5">
                <p className="text-center mb-1 text-color-error">
                  {errorMessage}
                </p>
                <button
                  disabled={loading}
                  type="button"
                  onClick={(e) => onSubmit(e)}
                  className={`w-full py-2.5 transition px-4 text-sm font-semibold rounded text-white bg-color-primary    focus:outline-none `}
                >
                  {loading ? <Loader /> : "Register"}
                </button>
              </div>
              <p className="text-sm !mt-3 text-center text-n-1">
                Already have account?
                <Link
                  to={"/login"}
                  className=" text-color-primary hover:underline ml-1 whitespace-nowrap"
                >
                  Login
                </Link>
              </p>
            </div>
            {link == "" ? (
              <></>
            ) : (
              <div className="max-w-lg mx-auto mt-5  rounded-lg shadow-lg">
                <h2 className="text-sm font-bold text-n-3 ">
                  (If you did not got verification email due to some issues just
                  press this link to verify for testing :)
                </h2>
                <a href={link} className=" text-color-5 text-sm ">
                  {" "}
                  Verify your email
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <SnackBarComponent
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        severity={severity}
        message={message}
      />
    </div>
  );
};

export default Register;
