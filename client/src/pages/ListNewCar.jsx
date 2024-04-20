import React, { useState } from "react";

import { FaCar } from "react-icons/fa";
import { useUserContext } from "../contexts/userContext";
import { apiRequest } from "../utils";
import Cloudinary from "../components/Cloudinary";
import Loader from "../components/Loader";
import UseAutocomplete from "../components/AutoCompleteInput";

const ListNewCar = () => {
  const { user } = useUserContext();
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [available, setAvailable] = useState(true);
  const [city, setCity] = useState("");
  const [ac, setAC] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [seatCapacity, setSeatCapacity] = useState("2");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitImages = async () => {
    const urls = await Promise.all(
      images.map(async (imageObj) => {
        const data = new FormData();
        data.append("file", imageObj.file);
        data.append("upload_preset", "testingApp");
        data.append("cloud_name", "dswe0emus");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dswe0emus/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const imageData = await response.json();
        // return imageData.url; // Assuming 'url' is the key that contains the image URL
        return {
          url: imageData.secure_url, // The secure URL of the uploaded image
          public_id: imageData.public_id, // The public_id of the uploaded image
        };
      })
    );
    return urls;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!name || !description || !price || !city) {
        setErrorMessage("Fill all fields");
        return;
      }

      if (images.length <= 0) {
        setErrorMessage("Upload at least 1 image");
        return;
      }

      const imageUrls = await submitImages();
      const res = await apiRequest({
        url: "/car/list",
        data: {
          name,
          images: imageUrls,
          description,
          price,
          available,
          city,
          ac,
          automatic,
          seatCapacity,
          userId: user._id,
        },
        method: "POST",
        token: user?.token,
      });

      if (res && res.status == false) {
        setErrorMessage(res.error);
      } else {
        setErrorMessage("");
        // const newData = { token: res?.token, ...res?.user };
        // UserLogin(newData);
        window.location.replace("/listyourcar");
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
        <div className=" min-h-screen flex flex-col items-center justify-center py-6 px-2 sm:px-4">
          <div className="  z-10 border border-stroke-1 bg-n-7 w-full   rounded-md p-3 sm:p-6 max-w-2xl  max-md:mx-auto">
            <div className="space-y-4">
              <div className="mb-10">
                <h3 className="text-3xl text-n-1 font-extrabold">
                  List your car for rent
                </h3>
                {/* <p className="text-sm mt-4">
              Sign in to your account and explore a world of possibilities.
              Your journey begins here.
            </p> */}
              </div>

              <div className=" flex flex-col gap-5 w-full sm:flex-row">
                <div className=" w-full ">
                  <label className="text-sm text-n-1 mb-1  block">Name</label>
                  <div className="relative flex items-center">
                    <input
                      required
                      className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                      placeholder="Enter your car name or model"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className=" w-full">
                  <label className="text-sm text-n-1 mb-1  block">City</label>
                  <div className="relative flex items-center">
                    <UseAutocomplete
                      className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                      placeholder="Enter city name"
                      setCity={setCity}
                      city={city}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-n-1 mb-1  block">
                  Description
                </label>
                <div className="relative flex items-center">
                  <textarea
                    required
                    className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                    placeholder="Explain your car features in detail"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-n-1 mb-1  block">
                  Price / day
                </label>
                <div className="relative flex items-center">
                  <input
                    required
                    className="w-full text-sm border border-stroke-1 px-4 py-3 bg-transparent text-n-2 rounded-md outline-none placeholder-n-3"
                    placeholder="Price $ / day"
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className=" flex items-center space-x-4 w-full">
                <div className="flex flex-wrap gap-x-5 sm:gap-x-10 w-full">
                  <div className="inline-flex items-center mt-3">
                    <span className="mr-2 text-sm font-semibold flex items-center gap-1 text-n-1">
                      Avaliable
                    </span>
                    <input
                      name="avaliable"
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-green-500"
                      checked={available}
                      onChange={(e) => {
                        setAvailable(e.target.checked);
                      }}
                    />
                  </div>
                  <div className="inline-flex items-center mt-3">
                    <span className="mr-2 flex text-sm font-semibold items-center gap-1 text-n-1">
                      AC
                    </span>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      value={ac}
                      onChange={(e) => {
                        setAC(e.target.checked);
                      }}
                    />
                  </div>
                  <div className="inline-flex items-center mt-3">
                    <span className="mr-2 text-sm font-semibold flex items-center gap-1 text-n-1">
                      Automatic
                    </span>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-green-500"
                      value={automatic}
                      onChange={(e) => {
                        setAutomatic(e.target.checked);
                      }}
                    />
                  </div>

                  <div className=" flex items-center mt-3">
                    <span className="mr-2 text-sm font-semibold  text-n-1">
                      Seat Capacity
                    </span>
                    <div className="  relative ">
                      <select
                        className="appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm font-bold"
                        value={seatCapacity}
                        onChange={(e) => setSeatCapacity(e.target.value)}
                      >
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="10">10</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaCar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" pt-5">
                <Cloudinary
                  images={images}
                  setImages={setImages}
                  setErrorMessage={setErrorMessage}
                />
              </div>

              <div className="!mt-5">
                <p className="text-center mb-1 text-red-400">{errorMessage}</p>
                <button
                  disabled={loading}
                  type="button"
                  onClick={(e) => onSubmit(e)}
                  className={`w-full py-2.5 transition px-4 text-sm font-semibold rounded text-white bg-color-primary    focus:outline-none `}
                >
                  {loading ? <Loader /> : "List Your Car"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNewCar;
