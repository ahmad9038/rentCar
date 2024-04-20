import React, { useState } from "react";
import Loader from "../components/Loader";
import { apiRequest, validateEmail } from "../utils";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) {
        setErrorMessage("Enter your email");
        return;
      }

      if (!validateEmail(email)) {
        setErrorMessage("Invalid email address");
        return;
      }

      const res = await apiRequest({
        url: "/users/request-passwordreset",
        data: { email },
        method: "POST",
      });

      if (res && res.status == false) {
        setErrorMessage(res.error);
      } else {
        setErrorMessage("");
        // window.location.replace("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full h-screen items-center justify-center">
      <div className="font-[sans-serif] text-[#333]">
        <div className=" relative min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className=" absolute z-10 border border-stroke-1 bg-n-8 w-full sm:w-[450px]  rounded-md p-6 max-w-md  max-md:mx-auto">
            <div className="space-y-4">
              {/* <div className="mb-10"> */}
              {/* <h3 className="text-3xl font-extrabold">Password Reset</h3> */}
              {/* <p className="text-sm mt-4">
              Sign in to your account and explore a world of possibilities.
              Your journey begins here.
            </p> */}
              {/* </div> */}

              <div>
                <label className="text-sm text-n-1 mb-1   block">Email</label>
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

              <div className="!mt-5">
                <p className="text-center mb-1 text-errorRed">{errorMessage}</p>
                <button
                  disabled={loading}
                  type="button"
                  onClick={(e) => onSubmit(e)}
                  className={`w-full py-2.5 transition px-4 text-sm font-semibold rounded text-white bg-color-primary    focus:outline-none `}
                >
                  {loading ? <Loader /> : "Send Email"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
