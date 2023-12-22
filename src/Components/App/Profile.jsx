import React from "react";
import { useEffect, useState } from "react";
import logo from "../../assets/download.jpeg";
import {
  FaMobile,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedinIn,
  FaUser,
} from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data from your API
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_ENVIRONMENT == "PRODUCTION" ? '/api' : import.meta.env.VITE_BACKEND_URL}/profile`, {
          withCredentials: true,
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (

    <div className="max-w-md mx-auto p-6 bg-black1 rounded-md shadow-md text-white">

      <div className="flex items-center justify-center mb-4">
        <img
          className="h-[200px] w-[200px] object-cover rounded-full border-4 border-white shadow-lg"
          src={logo}
          alt="User Avatar"
        />
      </div>
      <div className="flex items-center justify-center text-4xl font-semibold mb-4">
        {userData.name}
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-black2 p-2 rounded-[0.5rem] text-black6 shadow-md inline-block mx-auto">
          {userData.insta_id?userData.insta_id:"insta_id"}
        </div>
      </div>
      <div className="flex items-center justify-center p-3">
        <div className="bg-black2 p-4 rounded-[0.5rem] text-black6 shadow-md inline-block  mr-3">
          <FaInstagram />
        </div>
        <div className="bg-black2 p-4 rounded-[0.5rem] text-black6 shadow-md inline-block mr-3">
          <FaTwitter />
        </div>
        <div className="bg-black2 p-4 rounded-[0.5rem] text-black6 shadow-md inline-block  mr-3">
          <FaFacebook />
        </div>
        <div className="bg-black2 p-4 rounded-[0.5rem] text-black6 shadow-md inline-block ">
          <FaLinkedinIn />
        </div>
      </div>
      <div className="bg-black2 p-6 rounded-2xl shadow-md text-white my-4">
        <div className="flex items-center mb-2">
          <FaMobile className="text-2xl mr-2 text-blue-500" />
          <div>
            <p className="text-black6">Mobile No</p> {userData.phone_number?userData.phone_number:"phone_number"}
          </div>
        </div>
        <hr className="border-gray-600 my-2" />
        <div className="flex items-center mb-2">
          <FaEnvelope className="text-2xl mr-2 text-green-500" />
          <div>
            <p className="text-black6">Email</p> {userData.email?userData.email:"email"}
          </div>
        </div>
        <hr className="border-gray-600 my-2" />
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="text-2xl mr-2 text-yellow-500" />
          <div>
            <p className="text-black6">Location</p> {userData.location?userData.location:"location"}
          </div>
        </div>
        <hr className="border-gray-600 my-2" />
        <div className="flex items-center">
          <FaBirthdayCake className="text-2xl mr-2 text-pink-500" />
          <div>
            <p className="text-black6">Date of Birth</p> {userData.dob?userData.dob:"dob"}
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="text-4xl font-medium mb-2 ">About Me</div>
        <div className="text-black6">
          {userData.description?userData.description:"description"}
        </div>
      </div>
    </div>
  );
}

export default Profile;




