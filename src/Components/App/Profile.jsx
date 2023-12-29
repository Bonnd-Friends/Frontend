import React, { useEffect, useState, useRef } from "react";
import logo from "../../assets/download.jpeg";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUpload } from "react-icons/fa";
import Cropper from "react-easy-crop";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaMobile,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedinIn,
  FaEdit,
} from "react-icons/fa";

const Profile = () => {
  const navigateTo = useNavigate();
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const inputRef = useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    // Fetch user data from your API
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
              ? "/api"
              : import.meta.env.VITE_BACKEND_URL
          }/profile`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        const data = await response.json();
        setUserData(data);
        setFormData(data); // Set form data initially

        // console.log(userData.image_url[0])

        await fetch(`${import.meta.env.VITE_IMAGE_BACKEND_URL}/image/${
          userData.image_url[0]
        }`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json, charset=UTF-8",
            Accept: "application/json, image/png", 
          },
          withCredentials:true,
          credentials: "include",
        })
        .then((response) => response.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setImageData(imageUrl);
        })
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [editMode]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCropComplete = (croppedAreaPixels, croppedImage) => {
    setCroppedImage(croppedImage);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setSelectedImage(reader.result);
      });
    }
  };

  const handleFormUpload = async (e) => {
    e.preventDefault();
    if (!croppedImage) {
      alert("Please select and crop an image before uploading.");
      return;
    }
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("file", file);
      formDataWithFile.append("croppedImage", JSON.stringify(croppedImage));

      const response = await fetch(
        `${import.meta.env.VITE_IMAGE_BACKEND_URL}/api/images/${
          userData.username
        }`,
        {
          method: "POST",
          body: formDataWithFile,
          withCredentials: true,
          credentials: "include",
        }
      );
      const updatedData = await response.json();
      setUserData(updatedData);

      if (response.ok) {
        setFormData({
          ...formData,
          image_url: [...formData.image_url, updatedData.imageUrl],
        });
        alert("Image uploaded Successfully!!");
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
            ? "/api"
            : import.meta.env.VITE_BACKEND_URL
        }/profile/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          withCredentials: true,
          credentials: "include",
        }
      );
      const updatedData = await response.json();
      setUserData(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
            ? "/auth"
            : import.meta.env.VITE_BACKEND_URL
        }/auth/logout`,
        {
          method: "GET",
          withCredentials: true,
          credentials: "include",
        }
      );
      if (response.ok){
        alert("Logged Out");
        navigateTo("/");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black1 rounded-md shadow-md text-white relative">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <button
          onClick={handleEditClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          <FaSignOutAlt />
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center justify-center mb-4">
            {selectedImage ? (
              <>
                <div className="relative w-64 h-36">
                  <Cropper
                    image={selectedImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={9 / 16}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <div className="w-64 mx-auto mt-4">
                  <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(zoom) => setZoom(zoom)}
                  />
                </div>
              </>
            ) : (
              <label
                htmlFor="avatarInput"
                className="cursor-pointer flex items-center justify-center rounded-full w-[200px] h-[200px]"
              >
                <FaUpload size={24} className="absolute x-[50%]" />
                <span className="text-gray-500">
                  <img
                    className="h-[200px] w-[200px] object-cover bg-black opacity-50 rounded-full border-4 border-white"
                    src={selectedImage || logo}
                    alt="User Avatar"
                  />
                </span>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>
          {croppedImage && (
            <div className="text-center mt-4">
              <button
                onClick={handleFormUpload}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Upload Cropped Image
              </button>
            </div>
          )}

          <div className="flex items-center justify-center">
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              className="bg-black2 text-black6 p-2 mb-2 rounded-[0.5rem] shadow-md inline-block"
              placeholder="Name"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-black2 rounded-[0.5rem] text-black6 shadow-md inline-block mx-auto">
              <input
                type="text"
                name="insta_id"
                value={formData.insta_id || ""}
                onChange={handleInputChange}
                className="bg-black2 text-black6 p-2 rounded-[0.5rem] shadow-md inline-block"
                placeholder="Instagram ID"
              />
            </div>
          </div>

          <div className="bg-black2 p-6 rounded-2xl shadow-md text-white my-4">
            <div className="flex items-center mb-2">
              <FaMobile className="text-2xl mr-2 text-blue-500" />
              <div>
                <p className="text-black6">Mobile No</p>{" "}
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number || ""}
                  onChange={handleInputChange}
                  className="bg-black2 text-black6 p-2 rounded-[0.5rem] shadow-md inline-block"
                  placeholder="Mobile Number"
                />
              </div>
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="flex items-center mb-2">
              <FaEnvelope className="text-2xl mr-2 text-green-500" />
              <div>
                <p className="text-black6">Email</p>{" "}
                <input
                  type="text"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="bg-black2 text-black6 p-2 rounded-[0.5rem] shadow-md inline-block"
                  placeholder="Email"
                />
              </div>
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-2xl mr-2 text-yellow-500" />
              <div>
                <p className="text-black6">Location</p>{" "}
                <input
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  className="bg-black2 text-black6 p-2 rounded-[0.5rem] shadow-md inline-block"
                  placeholder="Location"
                />
              </div>
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="flex items-center">
              <FaBirthdayCake className="text-2xl mr-2 text-pink-500" />
              <div>
                <p className="text-black6">Date of Birth</p>{" "}
                <input
                  type="text"
                  name="dob"
                  value={formData.dob || ""}
                  onChange={handleInputChange}
                  className="bg-black2 text-black6 p-2 rounded-[0.5rem] shadow-md inline-block"
                  placeholder="Date of Birth"
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <div className="text-4xl font-medium mb-2 ">About Me</div>
            <div className="text-black6">
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                className="bg-black2 text-black6 p-2 rounded-md shadow-md inline-block"
                placeholder="Description"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800"
          >
            Save
          </button>
        </form>
      ) : (
        <>
          <div className="flex items-center justify-center mb-4">
            <img
              className="h-[200px] w-[200px] object-cover rounded-full border-4 border-white shadow-lg"
              src={imageData || logo}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div className="flex items-center justify-center p-2 mb-2 text-2xl rounded-[0.5rem] text-black6 inline-block">
            {userData.name ? userData.name : "Jon Doe"}
          </div>
          <div className="flex items-center justify-center p-3">
            <a
              href={`https://www.instagram.com/${userData.insta_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-black2 p-4 rounded-[0.5rem] text-black6 shadow-md inline-block mr-3">
                <FaInstagram />
              </div>
            </a>

            <a
              href={`https://twitter.com/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-black2 p-4 rounded-[0.5rem] text-black6 shadow-md inline-block mr-3">
                <FaTwitter />
              </div>
            </a>
            <a
              href={`https://www.facebook.com/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-black2 p-4 rounded-[0.5rem] text-black6 shadow-md inline-block mr-3">
                <FaFacebook />
              </div>
            </a>
            <a
              href={`https://www.linkedin.com/in/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-black2 p-4 rounded-[0.5rem] text-black6 shadow-md inline-block">
                <FaLinkedinIn />
              </div>
            </a>
          </div>
          <div className="bg-black2 p-6 rounded-2xl shadow-md text-white my-4">
            <div className="flex items-center mb-2">
              <FaMobile className="text-2xl mr-2 text-blue-500" />
              <div>
                <p className="text-black6">Mobile No</p>{" "}
                {userData.phone_number ? userData.phone_number : "phone_number"}
              </div>
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="flex items-center mb-2">
              <FaEnvelope className="text-2xl mr-2 text-green-500" />
              <div>
                <p className="text-black6">Email</p>{" "}
                {userData.email ? userData.email : "email"}
              </div>
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-2xl mr-2 text-yellow-500" />
              <div>
                <p className="text-black6">Location</p>{" "}
                {userData.location ? userData.location : "location"}
              </div>
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="flex items-center">
              <FaBirthdayCake className="text-2xl mr-2 text-pink-500" />
              <div>
                <p className="text-black6">Date of Birth</p>{" "}
                {userData.dob ? userData.dob : "dob"}
              </div>
            </div>
          </div>

          <div className="mb-2">
            <div className="text-4xl font-medium mb-2 ">About Me</div>
            <div className="text-black6">
              {userData.description ? userData.description : "description"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
