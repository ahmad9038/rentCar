import React, { useState } from "react";
import icons from "../constants/icons";
import Loader from "../components/Loader";
import { validateEmail, apiRequest } from "../utils";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

const Login = () => {
  const { UserLogin } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  //values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        setErrorMessage("Fill all fields");
        return;
      }

      if (!validateEmail(email)) {
        setErrorMessage("Invalid email address");
        return;
      }

      const res = await apiRequest({
        url: "/users/login",
        data: { email, password },
        method: "POST",
      });

      if (res && res.status == false) {
        setErrorMessage(res.error);
      } else {
        setErrorMessage("");

        const newData = { token: res?.token, ...res?.user };
        UserLogin(newData);
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full h-screen items-center justify-center">
      <div className="font-[sans-serif] text-[#333] ">
        <div className="relative min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className=" absolute z-10 border border-stroke-1 bg-n-8 w-full sm:w-[450px]  rounded-md p-6 max-w-md  max-md:mx-auto">
            <div className="space-y-4">
              <div className="mb-10">
                <h3 className="text-3xl text-n-1 font-extrabold">Login</h3>
                {/* <p className="text-sm mt-4">
                  Sign in to your account and explore a world of possibilities.
                  Your journey begins here.
                </p> */}
              </div>

              <div>
                <label className="text-sm text-n-1 mb-1  block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-n-1 mb-1  block">Password</label>
                <div className=" flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                    placeholder="Enter password"
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

              <div className="flex items-center justify-end ">
                <Link
                  to={"/reset-password"}
                  className=" text-color-primary  text-right hover:underline text-sm "
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="!mt-5">
                <p className="text-center mb-1 text-errorRed">{errorMessage}</p>
                <button
                  disabled={loading}
                  type="button"
                  onClick={(e) => onSubmit(e)}
                  className={`w-full py-2.5 transition px-4 text-sm font-semibold rounded text-white bg-color-primary    focus:outline-none `}
                >
                  {loading ? <Loader /> : "Login"}
                </button>
              </div>
              <p className="text-sm !mt-3 text-center text-n-1">
                Don't have an account?
                <Link
                  to={"/register"}
                  className=" text-color-primary  hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </div>
            <div className="max-w-lg mx-auto mt-5  rounded-lg shadow-lg">
              <h2 className="text-sm font-bold text-n-3 ">(For Testing)</h2>
              <div className="">
                <p className="text-n-2 font-bold text-sm leading-none">
                  Email:{" "}
                </p>
                <p className="text-n-4 text-sm ">
                  {" "}
                  ahmadshahzad.9038@gmail.com
                </p>
              </div>
              <div className="">
                <p className="text-n-2 text-sm font-bold leading-none">
                  Password:{" "}
                </p>
                <p className="text-n-4  text-sm"> a</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
