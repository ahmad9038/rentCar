import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Loader from "./Loader";
import { apiRequest } from "../utils";

const EditCloudinary = ({ images, setImages, setErrorMessage, carId }) => {
  const [hideButton, setHideButton] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const combinedImages = [...images, ...selectedImages];
    // Check if the combined array length is more than 3
    if (combinedImages.length > 3) {
      // alert("You can only upload up to 3 images.");
      setErrorMessage("You can only upload 3 images");
    } else {
      setImages(combinedImages);
      setErrorMessage("");
    }
    fileInputRef.current.value = "";
  };

  const removeImage = (index) => {
    const imageId = images[index].public_id;

    // Call your server to generate a signature
    if (imageId) {
      fetch("https://rent-a-car-wine.vercel.app/car/generate-delete-signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carId,
          public_id: imageId,
          timestamp: Math.round(new Date().getTime() / 1000),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.signature) {
            const formData = new FormData();
            formData.append("public_id", imageId);
            formData.append("signature", data.signature);
            formData.append("api_key", "978521354944188"); // Your Cloudinary API key
            formData.append("timestamp", data.timestamp); // Append the timestamp to the form data

            // Make the delete request to Cloudinary with the signature
            return fetch(
              "https://api.cloudinary.com/v1_1/dswe0emus/image/destroy",
              {
                method: "post",
                body: formData,
              }
            );
          } else {
            throw new Error("Failed to generate signature");
          }
        })
        .then((response) => response.json())
        .then((result) => {
          if (result.result === "ok") {
            console.log("Image deleted successfully");
            setImages(images.filter((_, i) => i !== index));
          } else {
            throw new Error(`Failed to delete image: ${result.error.message}`);
          }
        })
        .catch((err) => console.error("Error deleting image:", err));
    } else {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      // Clear the file input if all images are removed
      if (newImages.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    if (images.length >= 3) {
      setHideButton(false);
    } else {
      setHideButton(true);
    }
  }, [removeImage, handleImageChange]);

  return (
    <div>
      {hideButton ? (
        <label className="  text-sm text-center bg-n-1 text-color-primary font-bold py-3 px-4 rounded-full cursor-pointer ">
          Upload Images
          <input
            multiple
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </label>
      ) : (
        <></>
      )}

      <div className=" flex mt-5 flex-wrap w-full gap-3 overflow-hidden">
        {images.map((image, index) => (
          <div key={index} className="  w-[100px] relative ">
            <img
              src={image.url ? image.url : image.preview}
              alt="preview"
              className=" w-full rounded-md"
            />
            {images.length > 1 ? (
              <button
                className=" absolute top-1 right-1 text-black text-xl bg-white rounded-full p-1 "
                onClick={() => removeImage(index)}
              >
                <RxCross2 />
              </button>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCloudinary;
