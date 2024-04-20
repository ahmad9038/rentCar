import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Cloudinary = ({ images, setImages, setErrorMessage }) => {
  const [hideButton, setHideButton] = useState(false);
  const fileInputRef = useRef(null);
  console.log(images);

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
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    // Clear the file input if all images are removed
    if (newImages.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (images.length >= 3) {
      setHideButton(false);
    } else {
      setHideButton(true);
    }
  }, [removeImage, handleImageChange]);

  const submitImages = () => {
    images.forEach((imageObj) => {
      const data = new FormData();
      data.append("file", imageObj.file);
      data.append("upload_preset", "testingApp");
      data.append("cloud_name", "dswe0emus");

      fetch("https://api.cloudinary.com/v1_1/dswe0emus/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    });
  };

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
              src={image.preview}
              alt="preview"
              className=" w-full rounded-md"
            />
            <button
              className=" absolute top-1 right-1 text-black text-xl bg-white rounded-full p-1 "
              onClick={() => removeImage(index)}
            >
              <RxCross2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cloudinary;
